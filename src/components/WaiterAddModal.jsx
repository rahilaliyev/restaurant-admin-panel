import axiosInstance from "helpers/axiosInstance";
import ModalLayout from "layout/ModalLayout";
import React from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { waitersAtom } from "store";
import Forms from "./Forms";
import Loader from "./Loader";

const WaiterAddModal = ({ setModal }) => {
  const [newName, setNewName] = useState("");
  const [waiter, setWaiters] = useRecoilState(waitersAtom);
  const newObj = {
    id: waiter[waiter.length - 1].id + 1,
    avatar: "",
    name: newName,
  };

  const { mutate, isLoading } = useMutation(
    async () => {
      return axiosInstance.post(`/waiters`, newObj);
    },
    {
      onSuccess: () => {
        setWaiters([...waiter, newObj]);
        setModal(false);
      },
      onError: (err) => console.log(err),
    }
  );

  const addWaiterFn = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <ModalLayout setModal={setModal}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Forms submitFn={addWaiterFn} labelId="name" labelName="Ad:" inputValue={newName} inputSetValue={setNewName} />
        </div>
      )}
    </ModalLayout>
  );
};

export default WaiterAddModal;
