import axiosInstance from "helpers/axiosInstance";
import ModalLayout from "layout/ModalLayout";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { waitersAtom } from "store";
import Forms from "./Forms";
import Loader from "./Loader";

const WaiterEditModal = ({ name, setEditModal, id }) => {
  const [value, setValue] = useState(name);
  const [waiters, setWaiters] = useRecoilState(waitersAtom);

  const { mutate, isLoading } = useMutation(
    async () => {
      return axiosInstance.patch(`/waiters/${id}`, { name: value });
    },
    {
      onSuccess: () => {
        const updated = waiters.map((waiter) => {
          if (waiter.id === id) {
            return { ...waiter, name: value };
          }
          return waiter;
        });
        setWaiters(updated);
        setEditModal(false);
      },
      onError: (err) => console.log(err),
    }
  );

  const editNameFunction = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <ModalLayout setModal={setEditModal}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="edit-modal">
          <Forms submitFn={editNameFunction} labelId="name" labelName="Ad:" inputValue={value} inputSetValue={setValue} />
        </div>
      )}
    </ModalLayout>
  );
};

export default WaiterEditModal;
