import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Success.css";

function Success() {
  const navigate = useNavigate();

  const orderId = "XP" + Math.floor(Math.random() * 1000000);

  return (
    <>
      <Navbar />

      <div className="success-container">
        <div className="success-card">
          <div className="tick">✓</div>

          <h1>Payment Successful!</h1>

          <p>Thank you for shopping with XPro.</p>

          <h3>Order ID: {orderId}</h3>

          <button onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}

export default Success;