import { useLocation, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import "./Success.css";

function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, total } = location.state || {};

  return (
    <>
      <Navbar />

      <div className="success-container">
        <div className="success-card">
          <div className="tick">
            <FaCheck aria-hidden="true" />
          </div>

          <p className="success-kicker">Order confirmed</p>
          <h1>Payment Successful!</h1>

          <p>
            Thank you for shopping with Mercart. Your order has been placed
            successfully.
          </p>

          {orderId && <h3>Order ID: #{orderId}</h3>}
          {total !== undefined && <h4>Total Paid: Rs. {total}</h4>}

          <div className="success-actions">
            <button onClick={() => navigate("/orders")} type="button">
              Go to Orders
            </button>

            <button
              className="secondary"
              onClick={() => navigate("/products")}
              type="button"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;
