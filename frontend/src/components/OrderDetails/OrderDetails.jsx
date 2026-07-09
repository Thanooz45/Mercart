import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { apiUrl } from "../../api";
import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(apiUrl(`/api/orders/${id}`), {
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
        if (data) setItems(data);
      })
      .catch((err) => console.error(err));
  }, [id, navigate]);

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="order-details-container">
          <h2>No Order Found</h2>
        </div>
      </>
    );
  }

  const order = items[0];

  return (
    <>
      <Navbar />

      <div className="order-details-container">
        <h1>Order #{order.orderId}</h1>

        <div className="order-info">
          <p>
            <strong>Status:</strong> {order.status}
          </p>

          <p>
            <strong>Payment:</strong> {order.payment_method}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.created_at).toLocaleString()}
          </p>

          <h2>Total: ₹{order.total}</h2>
        </div>

        <h2>Products</h2>

        {items.map((item) => (
          <div className="product-card" key={item.productId}>
            <img src={item.image} alt={item.name} />

            <div className="product-info">
              <h3>{item.name}</h3>

              <p>Price: ₹{item.price}</p>

              <p>Quantity: {item.quantity}</p>

              <h4>
                Subtotal: ₹
                {Number(item.price) * item.quantity}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default OrderDetails;
