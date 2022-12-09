import { useState } from "react";
import HeaderSection from "components/HeaderSection";
import { useQuery } from "react-query";
import axiosInstance from "helpers/axiosInstance";
import { useRecoilState } from "recoil";
import { mealsAtom } from "store";
import MealCard from "components/MealCard";
import MealAddModal from "components/MealAddModal";
import Loader from "components/Loader";

const Meals = () => {
  const [meals, setMeals] = useRecoilState(mealsAtom);
  const [mealsAdd, setMealsAdd] = useState(false);

  const { isLoading } = useQuery(
    "meals",
    async () => {
      return axiosInstance.get("/meals");
    },
    {
      onSuccess: (response) => setMeals(response.data),
      onError: (err) => console.log(err),
    }
  );

  console.log(meals);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <HeaderSection
            pageName={"Yeməklər"}
            openModal={mealsAdd}
            setOpenModal={setMealsAdd}
            modalComponent={<MealAddModal setModal={setMealsAdd} />}
          />
          <div className="meals-cards grid">
            {meals
              .slice()
              .reverse()
              .map((meal) => (
                <MealCard name={meal.name} key={meal.id} id={meal.id} price={meal.price} img={meal.img} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Meals;
