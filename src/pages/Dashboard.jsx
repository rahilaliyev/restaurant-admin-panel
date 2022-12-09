import Widget from "components/Widget";
import axiosInstance from "helpers/axiosInstance";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { ordersAtom } from "store";

const Dashboard = () => {
  const [orders, setOrders] = useRecoilState(ordersAtom);
  const [countResultOrder, setcountResultOrder] = useState(0);
  const [countPaymentOrder, setcountPaymentOrder] = useState(0);
  const [totalOrderCount, setTotalOrderCount] = useState(0);
  useQuery(
    "orders",
    async () => {
      return axiosInstance.get("/orders");
    },
    {
      onSuccess: (response) => setOrders(response.data),
      onError: (err) => console.log(err),
    }
  );

  useEffect(() => {
    orders?.forEach((element) => {
      if (element.status === "Sonlanıb") {
        setcountResultOrder(countResultOrder + 1);
        setcountPaymentOrder(countPaymentOrder + element.payment);
      }
    });
    setTotalOrderCount(orders?.length);
  }, [orders]);

  console.log(countPaymentOrder);
  return (
    <div>
      <h1>Ana səhifə</h1>
      <div className="about-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac magna quis lectus mattis pharetra. Interdum et malesuada fames ac ante
          ipsum primis in faucibus. Praesent condimentum ante sed elit tincidunt, nec finibus eros vulputate. In eget pellentesque purus. Donec
          iaculis fermentum pellentesque. Sed eget hendrerit odio. Donec sed venenatis nibh. Maecenas a diam arcu. Nam sed gravida ipsum, rhoncus
          congue lorem. Nullam accumsan diam non maximus aliquet. In hac habitasse platea dictumst. Suspendisse ultrices, justo nec suscipit
          vestibulum, tortor ipsum pulvinar neque, sit amet iaculis purus mi et nibh. Sed non magna id nulla pulvinar viverra et dictum lectus.
          Quisque rutrum rutrum justo imperdiet aliquet.
        </p>
      </div>
      <div className="widgets">
        <Widget header="Sonlanan sifarişlər" link="/orders" result={countResultOrder} />
        <Widget header="Kassa ödənişi" link="/orders" result={`${countPaymentOrder} AZN`} />
        <Widget header="Ümumi sifariş sayı" link="/orders" result={totalOrderCount} />
      </div>
    </div>
  );
};

export default Dashboard;
