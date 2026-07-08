import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/orders", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setOrders(data);
      })
      .catch((err) => console.error(err));
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="orders-container">
        <h1>My Orders</h1>

        {orders.length === 0 ? (
          <h2>No Orders Found</h2>
        ) : (
          orders.map((order) => (
            <div
              className="order-card"
              key={order.id}
              onClick={() => navigate(`/orders/${order.id}`)}
            >
              <div>
                <h3>Order #{order.id}</h3>
                <p>{new Date(order.created_at).toLocaleString()}</p>
              </div>

              <div>
                <h3>₹{order.total}</h3>
                <span className="status">
                  {order.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Orders;