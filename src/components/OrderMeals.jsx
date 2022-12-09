import axiosInstance from "helpers/axiosInstance";
import ModalLayout from "layout/ModalLayout";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { ordersAtom } from "store";
import HeaderSection from "./HeaderSection";
import { FaTrashAlt } from "react-icons/fa";
import OrderMealAdd from "./OrderMealAdd";
import Select from "react-select";
import { mealsOptionAtom } from "store";
import Loader from "./Loader";

const OrderMeals = ({ table, waiter, orders, orderId, status, time }) => {
  const [orderModal, setOrderModal] = useState(false);
  const [openFoodModal, setOpenFoodModal] = useState(false);
  const [allOrders, setAllOrders] = useRecoilState(ordersAtom);
  const [orderList, setOrderList] = useState();
  const [waiterOption, setWaiterOption] = useRecoilState(mealsOptionAtom);
  const [diningTableNumber, setDiningTableNumber] = useState();
  const [changingTableNumber, setChangingTableNumber] = useState("");
  const [changingWaiterNumber, setChangingWaiterNumber] = useState("");

  useEffect(() => {
    setOrderList(orders);
    if (orderModal) {
      const tables = ["Masa 1", "Masa 2", "Masa 3", "Masa 4", "Masa 5", "Masa 6", "Masa 7", "Masa 8", "Masa 9", "Masa 10"];
      setDiningTableNumber([]);
      tables.map((i, key) => {
        setDiningTableNumber((item) => [...item, { value: key + 1, label: i }]);
        return i;
      });
    }
  }, [orders, orderModal]);

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

  let sum = orderList?.reduce((a, v) => (a = a + v.price * v.count), 0);

  const { mutate, isLoading } = useMutation(
    async () => {
      return axiosInstance.patch(`/orders/${orderId}`, {
        id: orderId,
        table: changingTableNumber === "" ? table : changingTableNumber,
        waiter: changingWaiterNumber === "" ? waiter : changingWaiterNumber,
        status: status,
        payment: sum,
        time: time,
        order: orderList,
      });
    },
    {
      onSuccess: () => {
        const updated = allOrders.map((order) => {
          if (order.id === orderId) {
            return {
              ...order,
              payment: sum,
              order: orderList,
              table: changingTableNumber === "" ? table : changingTableNumber,
              waiter: changingWaiterNumber === "" ? waiter : changingWaiterNumber,
            };
          }
          return order;
        });
        setAllOrders(updated);
        setOrderModal(false);
      },
      onError: (err) => console.log(err),
    }
  );

  const deleteFn = (idNumber) => {
    const update = orderList.filter((order) => order.id !== idNumber);
    setOrderList(update);
  };

  const handleClose = () => {
    setOrderModal(false);
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
    <div className="order-meal">
      <button className="look" onClick={() => setOrderModal(true)}>
        Bax
      </button>
      {orderModal && (
        <ModalLayout setModal={setOrderModal}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <HeaderSection
                pageName="Masa haqqında məlumat"
                openModal={openFoodModal}
                setOpenModal={setOpenFoodModal}
                modalComponent={
                  <OrderMealAdd
                    orderId={orderId}
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
                  <Select
                    defaultInputValue={table}
                    options={diningTableNumber}
                    id="masa"
                    placeholder="Masa seçin"
                    onChange={(item) => setChangingTableNumber(item.label)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="waiter">Ofisiant</label>
                  <Select
                    defaultInputValue={waiter}
                    options={waiterOption}
                    id="waiter"
                    placeholder="Ofisiant seçin"
                    onChange={(item) => setChangingWaiterNumber(item.label)}
                  />
                </div>
              </div>
              {orderList.length === 0 ? (
                <h2 style={{ margin: "80px 0" }}>Burada sifariş yoxdur</h2>
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
                    {orderList.map((order, key) => (
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
                            <button disabled={status !== "Sonlanmayıb"} onClick={() => decreaseFn(order.id)}>
                              -
                            </button>
                            <span>{order.count}</span>
                            <button disabled={status !== "Sonlanmayıb"} onClick={() => increaseFn(order.id)}>
                              +
                            </button>
                          </div>
                        </td>
                        <td>{order.price * order.count}</td>
                        <td>
                          <button onClick={() => deleteFn(order.id)} disabled={status !== "Sonlanmayıb"}>
                            <FaTrashAlt style={{ cursor: "pointer" }} />
                          </button>
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
                  <button onClick={mutate} className="submit" disabled={orderList.length === 0 || status !== "Sonlanmayıb"}>
                    Sifarişləri təsdiqlə
                  </button>
                </div>
              </div>
            </>
          )}
        </ModalLayout>
      )}
    </div>
  );
};

export default OrderMeals;
