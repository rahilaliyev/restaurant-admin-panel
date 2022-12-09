import ModalLayout from "layout/ModalLayout";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useRecoilState } from "recoil";
import { mealsOptionAtom } from "store";
import HeaderSection from "./HeaderSection";
import OrderMealAdd from "./OrderMealAdd";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import axiosInstance from "helpers/axiosInstance";
import { ordersAtom } from "store";
import Loader from "./Loader";

const DiningTableAdd = ({ modal, setModal, orders }) => {
  const [openFoodModal, setOpenFoodModal] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [waiterOption, setWaiterOption] = useRecoilState(mealsOptionAtom);
  const [diningTableNumber, setDiningTableNumber] = useState();
  const [changingTableNumber, setChangingTableNumber] = useState("");
  const [changingWaiterNumber, setChangingWaiterNumber] = useState("");
  const [allOrders, setAllOrders] = useRecoilState(ordersAtom);
  const [newOrder, setNewOrder] = useState({});

  let sum = orderList?.reduce((a, v) => (a = a + v.price * v.count), 0);

  useEffect(() => {
    if (modal) {
      const tables = ["Masa 1", "Masa 2", "Masa 3", "Masa 4", "Masa 5", "Masa 6", "Masa 7", "Masa 8", "Masa 9", "Masa 10"];
      setDiningTableNumber([]);
      tables.map((i, key) => {
        setDiningTableNumber((item) => [...item, { value: key + 1, label: i }]);
        return i;
      });
      setNewOrder((prevstate) => ({
        ...prevstate,
        id: orders[orders.length - 1].id + 1,
        table: changingTableNumber,
        waiter: changingWaiterNumber,
        status: "Sonlanmayıb",
        payment: sum,
        time: "-",
        order: orderList,
      }));
    }
  }, [orders, modal, changingTableNumber, changingWaiterNumber, orderList, sum]);

  console.log(newOrder);

  const { mutate, isLoading } = useMutation(
    async () => {
      return axiosInstance.post(`/orders/`, newOrder);
    },
    {
      onSuccess: () => {
        setAllOrders([...allOrders, newOrder]);
        setModal(false);
      },
      onError: (err) => console.log(err),
    }
  );

  const increaseFn = (idNumber) => {
    const updated = orderList.map((list) => {
      if (list.id === idNumber) {
        return { ...list, count: list.count + 1 };
      }
      return list;
    });
    setOrderList(updated);
  };
  const decreaseFn = (idNumber) => {
    const updated = orderList.map((list) => {
      if (list.id === idNumber && list.count > 1) {
        return { ...list, count: list.count - 1 };
      }
      return list;
    });
    setOrderList(updated);
  };

  const deleteFn = (idNumber) => {
    const update = orderList.filter((order) => order.id !== idNumber);
    setOrderList(update);
  };

  const handleClose = () => {
    setModal(false);
    setOrderList(orders);
  };

  useQuery(
    "waiterOption",
    async () => {
      return axiosInstance.get("/waiters");
    },
    {
      onSuccess: (response) => {
        setWaiterOption([]);
        response.data.map((i) => {
          setWaiterOption((item) => [...item, { value: i.id, label: i.name }]);
          return i;
        });
      },
      onError: (err) => console.log(err),
    }
  );
  return (
    <ModalLayout setModal={setModal}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <HeaderSection
            pageName="Masa əlavə et"
            openModal={openFoodModal}
            setOpenModal={setOpenFoodModal}
            modalComponent={
              <OrderMealAdd
                orderId={orders[orders.length - 1].id + 1}
                orderList={orderList}
                setOrderList={setOrderList}
                openFoodModal={openFoodModal}
                setModal={setOpenFoodModal}
              />
            }
          />
          <div className="order-table-and-waiter">
            <div className="form-group">
              <label htmlFor="masa">Masa</label>
              <Select options={diningTableNumber} id="masa" placeholder="Masa seçin" onChange={(item) => setChangingTableNumber(item.label)} />
            </div>
            <div className="form-group">
              <label htmlFor="waiter">Ofisiant</label>
              <Select options={waiterOption} id="waiter" placeholder="Ofisiant seçin" onChange={(item) => setChangingWaiterNumber(item.label)} />
            </div>
          </div>
          {orderList?.length === 0 ? (
            <h2 style={{ margin: "80px 0", textAlign: "center" }}>Yemək əlavə edin</h2>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Adı</th>
                  <th>Qiyməti</th>
                  <th style={{ padding: "0 30px" }}>Sayı</th>
                  <th>Ümumi</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orderList?.map((order, key) => (
                  <tr key={key}>
                    <td>
                      <div className="info">
                        <img src={order.img} alt="Meals" />
                        <span>{order.mealName}</span>
                      </div>{" "}
                    </td>
                    <td>{order.price}</td>
                    <td>
                      <div className="increase-decrease">
                        <button onClick={() => decreaseFn(order.id)}>-</button>
                        <span>{order.count}</span>
                        <button onClick={() => increaseFn(order.id)}>+</button>
                      </div>
                    </td>
                    <td>{order.price * order.count}</td>
                    <td>
                      <FaTrashAlt style={{ cursor: "pointer" }} onClick={() => deleteFn(order.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="button-group-total">
            <div className="total">
              <p>Ümumi:</p>
              <h3>{sum} Azn</h3>
            </div>
            <div className="button-group">
              <button onClick={handleClose} className="cancel">
                Ləğv et
              </button>
              <button onClick={mutate} className="submit" disabled={orderList.length === 0}>
                Sifarişləri təsdiqlə
              </button>
            </div>
          </div>
        </>
      )}
    </ModalLayout>
  );
};

export default DiningTableAdd;
