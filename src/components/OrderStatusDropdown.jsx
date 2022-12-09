import axiosInstance from "helpers/axiosInstance";
import {  useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { ordersAtom } from "store";
import { FaAngleDown } from "react-icons/fa";

const OrderStatusDropdown = ({ status, id }) => {
  const [orders, setOrders] = useRecoilState(ordersAtom);
  const [statusText, setStatusText] = useState();
  const [dropdown, setDropdown] = useState(false);

  const mutate1 = useMutation(
    async () => {
      return axiosInstance.patch(`/orders/${id}`, { status: statusText, time: new Date().toISOString() });
    },
    {
      onSuccess: () => {
        const updated = orders.map((order) => {
          if (order.id === id) {
            return { ...order, status: statusText, time: new Date().toISOString() };
          }
          return order;
        });
        setOrders(updated);
        setDropdown(false);
      },
      onError: (err) => console.log(err),
    }
  );

  const handleChange = (e, status) => {
    document.querySelectorAll(".dropdown li").forEach((li) => li.classList.remove("active"));
    e?.target?.parentElement?.classList.add("active");
    setStatusText(status);
  };

  return (
    <div className="dropdown">
      <span style={status === "Sonlanmayıb" ? { cursor: "pointer" } : { cursor: "default" }} onClick={() => setDropdown(!dropdown)}>
        {status} {status === "Sonlanmayıb" && <FaAngleDown />}
      </span>
      {dropdown && status === "Sonlanmayıb" && (
        <ul>
          <li>
            <button onClick={(e) => handleChange(e, "Sonlanmayıb")}>Sonlanmayıb</button>
          </li>
          <li>
            <button onClick={(e) => handleChange(e, "Sonlanıb")}>Sonlanıb</button>
          </li>
          <li>
            <button onClick={(e) => handleChange(e, "Ləğv olunub")}>Ləğv olunub</button>
          </li>
          <button onClick={mutate1.mutate} className="submit">
            Təsdiqlə
          </button>
        </ul>
      )}
    </div>
  );
};

export default OrderStatusDropdown;
