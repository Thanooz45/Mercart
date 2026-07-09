import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../api";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await fetch(apiUrl("/api/cart"), {
        credentials: "include",
      });

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      await fetch(apiUrl(`/api/cart/${id}`), {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity,
        }),
      });

      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await fetch(apiUrl(`/api/cart/${id}`), {
        method: "DELETE",
        credentials: "include",
      });

      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const openProduct = (productId) => {
    navigate(`/products/${productId}`, {
      state: {
        from: "/cart",
      },
    });
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="cart-container">
        <h1>Shopping Cart</h1>

        {cart.length === 0 ? (
          <h2>Your cart is empty.</h2>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-card" key={item.id}>

                <img
                  src={item.image}
                  alt={item.name}
                  style={{ cursor: "pointer" }}
                  onClick={() => openProduct(item.productId)}
                />

                <div className="cart-info">

                  <h2
                    style={{ cursor: "pointer" }}
                    onClick={() => openProduct(item.productId)}
                  >
                    {item.name}
                  </h2>

                  <h3>₹{item.price}</h3>

                  <div className="quantity-box">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <p>
                    <strong>
                      Subtotal: ₹{Number(item.price) * item.quantity}
                    </strong>
                  </p>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              <h2>Total: ₹{total}</h2>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed To Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
