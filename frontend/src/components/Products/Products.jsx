import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Products.css";
import ProductCard from "./ProductCard";
import Navbar from "../Navbar/Navbar";
import { apiUrl } from "../../api";

function Products() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  const fetchWishlist = async () => {
    try {
      const res = await fetch(apiUrl("/api/wishlist"), {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setWishlist(data.map((item) => item.productId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await fetch(apiUrl("/api/products"));
        const productData = await productRes.json();

        setProducts(productData);
        await fetchWishlist();
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchCategory =
        category === "All" ||
        product.category.toLowerCase() === category.toLowerCase();

      const matchSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "low") return a.price - b.price;
      if (sortBy === "high") return b.price - a.price;
      return 0;
    });

  return (
    <>
      <Navbar />

      <div className="products">
        <div className="products-header">
          <h1>Explore Products</h1>
          <p>{filteredProducts.length} Products Available</p>
        </div>

        <div className="products-top">
          <input
            type="text"
            placeholder="Search products..."
            className="search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="sort-container">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        <div className="category-bar">
          {[
            "All",
            "Electronics",
            "Fashion",
            "Home",
            "Sports",
            "Books",
          ].map((cat) => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => {
                setCategory(cat);

                if (cat === "All") {
                  navigate("/products");
                } else {
                  navigate(
                    `/products?category=${encodeURIComponent(cat)}`
                  );
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <h2>No products found.</h2>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlisted={wishlist.includes(product.id)}
                refreshWishlist={fetchWishlist}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
