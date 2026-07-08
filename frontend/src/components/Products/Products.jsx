import { useEffect, useState } from "react";
import "./Products.css";
import ProductCard from "./ProductCard";
import Navbar from "../Navbar/Navbar";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar />

      <div className="products">

        <div className="products-header">
          <h1>Explore Products</h1>
          <p>{products.length} Products Available</p>
        </div>

        <div className="category-bar">
          <button>All</button>
          <button>Electronics</button>
          <button>Fashion</button>
          <button>Home</button>
          <button>Sports</button>
          <button>Books</button>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </>
  );
}

export default Products;