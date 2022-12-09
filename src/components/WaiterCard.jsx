import axiosInstance from "helpers/axiosInstance";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { waitersAtom } from "store";
import WaiterEditModal from "./WaiterEditModal";

const WaitersCard = ({ name, img, id }) => {
  const [action, setAction] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [waiters, setWaiters] = useRecoilState(waitersAtom);

  const { mutate, isLoading } = useMutation(
    async () => {
      return axiosInstance.delete(`/waiters/${id}`);
    },
    {
      onSuccess: () => {
        setWaiters(waiters.filter((waiter) => waiter.id !== id));
      },
      onError: (err) => console.log(err),
    }
  );

  const deleteItem = (id, e) => {
    e.preventDefault();
    mutate(id);
  };

  return (
    <div className="waiter">
      <div className="waiter-info">
        <div className="waiter-img">{img ? <img src={img} alt="Ofisiant" /> : <span>{name[0].toUpperCase()}</span>}</div>
        <p>{name}</p>
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
      {editModal && <WaiterEditModal name={name} setEditModal={setEditModal} id={id} />}
    </div>
  );
};

export default WaitersCard;
