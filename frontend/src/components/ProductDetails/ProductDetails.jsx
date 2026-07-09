import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import { apiUrl } from "../../api";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const backPath = location.state?.from || "/products";

  const backText =
    backPath === "/wishlist"
      ? "Back to Wishlist"
      : backPath === "/cart"
      ? "Back to Cart"
      : "Back to Products";

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(apiUrl(`/api/products/${id}`))
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const res = await fetch(apiUrl("/api/cart"), {
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
      navigate("/cart");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="product-details-page">
          <h2 className="product-details-loading">Loading...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="product-details-page">
        <button
          className="product-details-back"
          onClick={() => navigate(backPath)}
          type="button"
        >
          <span aria-hidden="true">&larr;</span> {backText}
        </button>

        <section className="product-details-shell">
          <div className="product-details-image-panel">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-details-info">
            <p className="product-details-category">{product.category}</p>

            <h1>{product.name}</h1>

            <div className="product-details-rating" aria-label="Rated 4.8 out of 5">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} aria-hidden="true" />
              ))}
              <span>(4.8)</span>
            </div>

            <h2>Rs. {product.price}</h2>

            <p className="product-details-description">{product.description}</p>

            <p className="product-details-stock">
              Stock Available: {product.stock}
            </p>

            <div className="product-details-actions">
              <button
                className="product-details-cart"
                onClick={handleAddToCart}
                type="button"
              >
                <FaShoppingCart aria-hidden="true" /> Add to Cart
              </button>

              <button className="product-details-buy" type="button">
                Buy Now
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ProductDetails;
