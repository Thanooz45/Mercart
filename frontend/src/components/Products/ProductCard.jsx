import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { apiUrl } from "../../api";
import "./ProductCard.css";

function ProductCard({ product, wishlisted, refreshWishlist }) {
  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      let response;

      if (wishlisted) {
        response = await fetch(apiUrl(`/api/wishlist/${product.id}`), {
          method: "DELETE",
          credentials: "include",
        });
      } else {
        response = await fetch(apiUrl("/api/wishlist"), {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.id,
          }),
        });
      }

      if (response.ok) {
        refreshWishlist();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch(apiUrl("/api/cart"), {
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

      const data = await response.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <article className="store-product-card">
      <button
        className="store-wishlist-btn"
        onClick={toggleWishlist}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        type="button"
      >
        {wishlisted ? <FaHeart /> : <FaRegHeart />}
      </button>

      <Link to={`/products/${product.id}`} className="store-product-link">
        <div className="store-product-media">
          <img
            src={product.image}
            alt={product.name}
            className="store-product-image"
            loading="lazy"
          />
        </div>

        <div className="store-product-info">
          <h3 className="store-product-title" title={product.name}>
            {product.name}
          </h3>

          <p className="store-product-category">{product.category}</p>

          <span className="store-product-price">Rs. {product.price}</span>
        </div>
      </Link>

      <button className="store-cart-btn" onClick={addToCart} type="button">
        <FaShoppingCart aria-hidden="true" /> Add to Cart
      </button>
    </article>
  );
}

export default ProductCard;
