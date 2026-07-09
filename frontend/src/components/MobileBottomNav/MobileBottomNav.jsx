import "./MobileBottomNav.css";

import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaHeart,
  FaShoppingCart,
  FaBox,
  FaUser,
} from "react-icons/fa";

function MobileBottomNav() {
  const location = useLocation();
  const hiddenRoutes = ["/", "/login", "/register"];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="mobile-bottom-nav">

      <Link
        to="/home"
        className={location.pathname === "/home" ? "active" : ""}
      >
        <FaHome />
        <span>Home</span>
      </Link>

      <Link
        to="/wishlist"
        className={location.pathname === "/wishlist" ? "active" : ""}
      >
        <FaHeart />
        <span>Wishlist</span>
      </Link>

      <Link
        to="/cart"
        className={location.pathname === "/cart" ? "active" : ""}
      >
        <FaShoppingCart />
        <span>Cart</span>
      </Link>

      <Link
        to="/orders"
        className={location.pathname === "/orders" ? "active" : ""}
      >
        <FaBox />
        <span>Orders</span>
      </Link>

      <Link
        to="/profile"
        className={location.pathname === "/profile" ? "active" : ""}
      >
        <FaUser />
        <span>Profile</span>
      </Link>

    </div>
  );
}

export default MobileBottomNav;
