import { Link, useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const [wishlisted, setWishlisted] = useState(false);

  const handleAddToCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);

        if (res.status === 401) {
          navigate("/login");
        }
        return;
      }

      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const handleWishlist = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/wishlist", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);

        if (res.status === 401) {
          navigate("/login");
        }
        return;
      }

      setWishlisted(true);
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="product-card">

      <button
        className="wishlist-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleWishlist();
        }}
      >
        {wishlisted ? <FaHeart /> : <FaRegHeart />}
      </button>

      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>

      <div className="product-info">

        <Link
          to={`/products/${product.id}`}
          className="product-link"
        >
          <h3>{product.name}</h3>
        </Link>

        <p className="category">{product.category}</p>

        <div className="rating">
          ⭐⭐⭐⭐⭐ <span>(4.8)</span>
        </div>

        <h2>₹{product.price}</h2>

        <p className="delivery">Free Delivery</p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
        >
          🛒 Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;