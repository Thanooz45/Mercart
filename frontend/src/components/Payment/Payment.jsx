import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("UPI");

  const handlePayment = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Payment Successful!");
    navigate("/orders");
  } catch (err) {
    console.error(err);
    alert("Payment Failed");
  }
};

  return (
    <>
      <Navbar />

      <div className="payment-container">
        <div className="payment-card">
          <h1>Payment</h1>

          <p>Select Payment Method</p>

          <label>
            <input
              type="radio"
              value="UPI"
              checked={method === "UPI"}
              onChange={(e) => setMethod(e.target.value)}
            />
            UPI
          </label>

          <label>
            <input
              type="radio"
              value="Credit Card"
              checked={method === "Credit Card"}
              onChange={(e) => setMethod(e.target.value)}
            />
            Credit Card
          </label>

          <label>
            <input
              type="radio"
              value="Debit Card"
              checked={method === "Debit Card"}
              onChange={(e) => setMethod(e.target.value)}
            />
            Debit Card
          </label>

          <label>
            <input
              type="radio"
              value="Cash on Delivery"
              checked={method === "Cash on Delivery"}
              onChange={(e) => setMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <button onClick={handlePayment}>
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
}

export default Payment;