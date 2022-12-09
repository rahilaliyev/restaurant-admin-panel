import HeaderSection from "components/HeaderSection";
import Loader from "components/Loader";
import WaiterAddModal from "components/WaiterAddModal";
import WaitersCard from "components/WaiterCard";
import axiosInstance from "helpers/axiosInstance";
import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { waitersAtom } from "store";

const Waiters = () => {
  const [waiters, setWaiters] = useRecoilState(waitersAtom);
  const [waitersAdd, setWaitersAdd] = useState(false);
  const { isLoading } = useQuery(
    "waiters",
    async () => {
      return axiosInstance.get("/waiters");
    },
    {
      onSuccess: (response) => setWaiters(response.data),
      onError: (err) => console.log(err),
    }
  );

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <HeaderSection
            pageName={"Ofisiantlar"}
            openModal={waitersAdd}
            setOpenModal={setWaitersAdd}
            modalComponent={<WaiterAddModal setModal={setWaitersAdd} />}
          />
          <div className="waiter-cards grid">
            {waiters
              .slice()
              .reverse()
              .map((waiter) => (
                <WaitersCard name={waiter.name} img={waiter.avatar} key={waiter.id} id={waiter.id} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Waiters;
