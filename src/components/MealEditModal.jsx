import axiosInstance from "helpers/axiosInstance";
import ModalLayout from "layout/ModalLayout";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { mealsAtom } from "store";
import Forms from "./Forms";
import Loader from "./Loader";

const MealEditModal = ({ name, price, setEditModal, id }) => {
  const [nameMeal, setNameMeal] = useState(name);
  const [priceMeal, setPriceMeal] = useState(price);
  const [meals, setMeals] = useRecoilState(mealsAtom);

  const { mutate, isLoading } = useMutation(
    async () => {
      return axiosInstance.patch(`/meals/${id}`, { name: nameMeal, price: priceMeal });
    },
    {
      onSuccess: () => {
        const updated = meals.map((meal) => {
          if (meal.id === id) {
            return { ...meal, name: nameMeal, price: priceMeal };
          }
          return meal;
        });
        setMeals(updated);
        setEditModal(false);
      },
      onError: (err) => console.log(err),
    }
  );

  const editMealFunction = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <ModalLayout setModal={setEditModal}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="edit-modal">
          <Forms
            submitFn={editMealFunction}
            labelId="name"
            labelName="Ad:"
            inputValue={nameMeal}
            inputSetValue={setNameMeal}
            labelName2="Qiymət:"
            labelId2="price"
            inputPrice={priceMeal}
            inputSetPrice={setPriceMeal}
          />
        </div>
      )}
    </ModalLayout>
  );
};

export default MealEditModal;
