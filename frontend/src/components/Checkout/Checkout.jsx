import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/api/cart", {
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
      if (data) setCart(data);
    })
    .catch((err) => console.error(err));
}, [navigate]);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="checkout-container">

        <div className="checkout-left">

          <h2>Shipping Address</h2>

          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Phone Number" />
          <textarea placeholder="Address"></textarea>
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
          <input type="text" placeholder="Pincode" />

        </div>

        <div className="checkout-right">

          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="summary-item" key={item.id}>

              <div>
                <h4>{item.name}</h4>
                <p>
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <strong>
                ₹{Number(item.price) * item.quantity}
              </strong>

            </div>
          ))}

          <hr />

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₹{total}</strong>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <strong>FREE</strong>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>

          <button onClick={() => navigate("/payment")}>
  Continue to Payment
</button>

        </div>

      </div>
    </>
  );
}

export default Checkout;