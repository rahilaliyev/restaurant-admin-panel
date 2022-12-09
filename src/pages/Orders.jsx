import DiningTableAdd from "components/DiningTableAdd";
import HeaderSection from "components/HeaderSection";
import OrderMeals from "components/OrderMeals";
import OrderStatusDropdown from "components/OrderStatusDropdown";
import axiosInstance from "helpers/axiosInstance";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { ordersAtom } from "store";
import Moment from "react-moment";
import Select from "react-select";
import Loader from "components/Loader";

const Orders = () => {
  const [orderModal, setOrderModal] = useState(false);
  const [orders, setOrders] = useRecoilState(ordersAtom);
  const [filter, setFilter] = useState([]);
  const [filterText, setFilterText] = useState("");

  const { isLoading } = useQuery(
    "orders",
    async () => {
      return axiosInstance.get("/orders");
    },
    {
      onSuccess: (response) => setOrders(response.data),
      onError: (err) => console.log(err),
    }
  );

  const filterOptions = [
    { value: 1, label: "Sonlanıb" },
    { value: 2, label: "Sonlanmayıb" },
    { value: 3, label: "Ləğv olunub" },
  ];

  const handleFilter = (filterOption) => {
    setFilterText(filterOption);
    const filteringData = orders.filter((order) => order.status === filterOption);
    setFilter(filteringData);
  };

  useEffect(() => {
    setFilter(orders);
  }, [orders]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <HeaderSection
            pageName={"Sifarişlər"}
            openModal={orderModal}
            setOpenModal={setOrderModal}
            modalComponent={<DiningTableAdd orders={orders} modal={orderModal} setModal={setOrderModal} />}
          />
          <div className="filter-select">
            Filter:
            <Select options={filterOptions} onChange={(choising) => handleFilter(choising.label)} placeholder="Kateqoriya seçin" />
          </div>
          <div className="orders-table">
            <table>
              <thead>
                {filter.length !== 0 && orders.length !== 0 && (
                  <tr>
                    <th>S/s</th>
                    <th>Masa</th>
                    <th>Ofisiant</th>
                    <th>Status</th>
                    <th>Məbləğ</th>
                    <th>Tarix</th>
                    <th>Ətraflı</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {filter.length === 0 &&
                  filterText === "" &&
                  orders
                    .slice()
                    .reverse()
                    .map((order, key) => (
                      <tr key={key}>
                        <td>{order.id}</td>
                        <td>{order.table}</td>
                        <td>{order.waiter}</td>
                        <td>
                          <OrderStatusDropdown status={order.status} id={order.id} />
                        </td>
                        <td>{order.payment}</td>
                        <td>{order.time !== "-" ? <Moment format="DD-MM-YYYY / HH:MM">{order.time}</Moment> : "-"}</td>
                        <td>
                          <OrderMeals
                            orderId={order.id}
                            table={order.table}
                            waiter={order.waiter}
                            orders={order.order}
                            status={order.status}
                            time={order.time}
                          />
                        </td>
                      </tr>
                    ))}
                {filter.length !== 0 &&
                  filterText !== 0 &&
                  filter
                    .slice()
                    .reverse()
                    .map((order, key) => (
                      <tr key={key}>
                        <td>{order.id}</td>
                        <td>{order.table}</td>
                        <td>{order.waiter}</td>
                        <td>
                          <OrderStatusDropdown status={order.status} id={order.id} />
                        </td>
                        <td>{order.payment}</td>
                        <td>{order.time !== "-" ? <Moment format="DD-MM-YYYY / HH:MM">{order.time}</Moment> : "-"}</td>
                        <td>
                          <OrderMeals
                            orderId={order.id}
                            table={order.table}
                            waiter={order.waiter}
                            orders={order.order}
                            status={order.status}
                            time={order.time}
                          />
                        </td>
                      </tr>
                    ))}
                {filter.length === 0 && filterText !== "" && <h1 style={{ textAlign: "center" }}>Sifariş yoxdur</h1>}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
