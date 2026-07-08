import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      credentials: "include", // Send JWT cookie
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
  if (!product) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />

      <div className="product-details">
        <Link to="/products" className="back-btn">
          ← Back to Products
        </Link>

        <div className="details-container">
          <div className="image-section">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="info-section">
            <h1>{product.name}</h1>

            <p className="category">{product.category}</p>

            <div className="rating">
              ⭐⭐⭐⭐⭐ (4.8)
            </div>

            <h2>₹{product.price}</h2>

            <p className="description">
              {product.description}
            </p>

            <p className="stock">
              Stock Available : {product.stock}
            </p>

            <div className="buttons">
              <button
                className="cart-btn"
                onClick={handleAddToCart}
              >
                🛒 Add to Cart
              </button>

              <button className="buy-btn">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;