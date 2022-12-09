import axiosInstance from "helpers/axiosInstance";
import ModalLayout from "layout/ModalLayout";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { mealsAtom } from "store";
import Forms from "./Forms";
import Loader from "./Loader";

const MealAddModal = ({ setModal }) => {
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState();
  const [meals, setMeals] = useRecoilState(mealsAtom);
  const newObj = {
    id: meals[meals.length - 1].id + 1,
    name: newName,
    price: newPrice,
  };

  const { mutate, isLoading } = useMutation(
    async () => {
      return axiosInstance.post(`/meals`, newObj);
    },
    {
      onSuccess: () => {
        setMeals([...meals, newObj]);
        setModal(false);
      },
      onError: (err) => console.log(err),
    }
  );

  const addMealFn = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <ModalLayout setModal={setModal}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Forms
            submitFn={addMealFn}
            labelId="name"
            labelName="Ad:"
            inputValue={newName}
            inputSetValue={setNewName}
            labelName2="Qiymət:"
            labelId2="price"
            inputPrice={newPrice}
            inputSetPrice={setNewPrice}
          />
        </div>
      )}
    </ModalLayout>
  );
};

export default MealAddModal;
