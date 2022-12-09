import axiosInstance from "helpers/axiosInstance";
import ModalLayout from "layout/ModalLayout";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";
import { useRecoilState } from "recoil";
import { mealsOptionAtom } from "store";

const OrderMealAdd = ({ setModal, orderList, setOrderList, orderId }) => {
  const [mealOption, setMealOption] = useRecoilState(mealsOptionAtom);
  const [allMeals, setAllMeals] = useState([]);
  const [findingMeal, setFindingMeal] = useState("");
  const [addMeal, setAddMeal] = useState({});
  const [count, setCount] = useState(1);

  useQuery(
    "mealsOption",
    async () => {
      return axiosInstance.get("/meals");
    },
    {
      onSuccess: (response) => {
        setMealOption([]);
        response.data.map((i) => {
          setMealOption((item) => [...item, { value: i.id, label: i.name }]);
          return i;
        });
        setAllMeals(response.data);
      },
      onError: (err) => console.log(err),
    }
  );

  const handleFindMeal = (mealId) => {
    const find = allMeals?.find((meal) => meal?.id === mealId);
    setFindingMeal(find);
  };

  const handleSubmitAddMeal = (e) => {
    e.preventDefault();
    const sameProduct = orderList?.find((order) => order?.mealName === findingMeal.name);
    if (sameProduct) {
      const updated = orderList?.map((list) => {
        if (list?.id === sameProduct.id) {
          return { ...list, count: list.count + Number(count) };
        }
        return list;
      });
      setOrderList(updated);
    } else {
      setOrderList([...orderList, addMeal]);
    }
    setModal(false);
  };

  useEffect(() => {
    if (findingMeal) {
      setAddMeal((prevstate) => ({
        ...prevstate,
        id: orderList.length === 0 ? 1 : orderList[orderList.length - 1].id + 1,
        mealName: findingMeal.name,
        count: isNaN(count) ? count : Number(count),
        price: findingMeal.price,
        img: findingMeal.img,
      }));
    }
  }, [findingMeal, orderList, count]);

  return (
    <ModalLayout setModal={setModal}>
      <div className="add-meal-modal">
        <div className="form-content">
          <div className="form-group">
            <label htmlFor="meal">Yemek</label>
            <Select onChange={(choise) => handleFindMeal(choise.value)} options={mealOption} id="meal" placeholder="Yemək seçin" />
          </div>
          <div className="form-group">
            <label htmlFor="qty">Say</label>
            <input value={count} onChange={(e) => setCount(e.target.value)} type="number" placeholder="Neçə ədəd?" id="qty" />
          </div>
        </div>
        <div className="submit-button">
          <button onClick={(e) => handleSubmitAddMeal(e)}>Yemək əlavə et</button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default OrderMealAdd;
