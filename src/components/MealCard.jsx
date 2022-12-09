import axiosInstance from "helpers/axiosInstance";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { mealsAtom } from "store";
import Loader from "./Loader";
import MealEditModal from "./MealEditModal";

const MealCard = ({ name, id, price, img }) => {
  const [action, setAction] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [meals, setMeals] = useRecoilState(mealsAtom);

  const { mutate, isLoading } = useMutation(
    async () => {
      return axiosInstance.delete(`/meals/${id}`);
    },
    {
      onSuccess: () => {
        setMeals(meals.filter((meal) => meal.id !== id));
      },
      onError: (err) => console.log(err),
    }
  );

  const deleteItem = (id, e) => {
    e.preventDefault();
    mutate(id);
  };

  return (
    <div className="meal">
      <div className="meal-info">
        <img src={img} alt="meal" />
        <p>{name}</p>
        <span>{price} AZN</span>
      </div>
      <button className="actions" onClick={() => setAction(!action)}>
        <span></span>
        {action && (
          <div className="button-group">
            <button onClick={() => setEditModal(true)}>Düzəliş et</button>
            <button
              onClick={(e) => {
                deleteItem(id, e);
              }}
            >
              Sil
            </button>
          </div>
        )}
      </button>
      {editModal && <MealEditModal name={name} price={price} setEditModal={setEditModal} id={id} />}
    </div>
  );
};

export default MealCard;
