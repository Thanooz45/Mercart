import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../api";
import "./Navbar.css";

import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaHome,
  FaBox,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = () => {
    const value = search.trim();

    if (value === "") {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(value)}`);
    setMenuOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(apiUrl("/api/auth/logout"), {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("user");
      setMenuOpen(false);
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <nav className="navbar">

        <div className="navbar-logo">
          <Link to="/home">XPro</Link>
        </div>

        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>

        <div className="desktop-links">

          <Link to="/home">
            <FaHome />
            <span>Home</span>
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/wishlist">
            <FaHeart />
          </Link>

          <Link to="/cart">
            <FaShoppingCart />
          </Link>

          <Link to="/orders">
            <FaBox />
          </Link>

          <Link to="/profile">
            <FaUser />
          </Link>

          <button
            className="logout-btn"
            onClick={handleLogout}
            type="button"
            aria-label="Logout"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

        </div>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </nav>

      {menuOpen && (
        <div className="mobile-menu">

          <Link
            to="/home"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>

          <Link
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
          >
            Wishlist
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>

          <Link
            to="/orders"
            onClick={() => setMenuOpen(false)}
          >
            Orders
          </Link>

          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>

          <button
            className="mobile-logout-btn"
            onClick={handleLogout}
            type="button"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>
      )}
    </>
  );
};

export default Navbar;
