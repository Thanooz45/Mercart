import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../api";
import "./FeaturedProducts.css";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(apiUrl("/api/products"))
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 4));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="featured-products">
      <div className="section-title">
        <h2>Featured Products</h2>
        <p>Our best-selling products</p>
      </div>

      <div className="featured-grid">
        {products.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="featured-card"
          >
            <div className="featured-card-media">
              <img src={product.image} alt={product.name} loading="lazy" />
            </div>

            <div className="featured-card-body">
              <h3>{product.name}</h3>
              <p className="featured-price">Rs. {product.price}</p>
              <span>{product.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
