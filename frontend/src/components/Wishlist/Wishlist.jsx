import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { apiUrl } from "../../api";
import "./Wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    try {
      const res = await fetch(apiUrl("/api/wishlist"), {
        credentials: "include",
      });

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setWishlist(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeWishlist = async (productId) => {
    try {
      const res = await fetch(
        apiUrl(`/api/wishlist/${productId}`),
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        fetchWishlist();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openProduct = (productId) => {
    navigate(`/products/${productId}`, {
      state: {
        from: "/wishlist",
      },
    });
  };

  return (
    <>
      <Navbar />

      <div className="wishlist-page">
        <h1>❤️ My Wishlist</h1>

        {wishlist.length === 0 ? (
          <h2>Your wishlist is empty.</h2>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <div
                className="wishlist-card"
                key={item.id}
                onClick={() => openProduct(item.productId)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <h3>{item.name}</h3>

                <p>{item.category}</p>

                <h2>₹{item.price}</h2>

                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeWishlist(item.productId);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Wishlist;
