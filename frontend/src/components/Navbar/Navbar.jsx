import "./Navbar.css";

import { Link } from "react-router-dom";

import {
    FaSearch,
    FaShoppingCart,
    FaHeart,
    FaUser
} from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="navbar">

            <div className="navbar-logo">
                <Link to="/">XPro</Link>
            </div>

            <div className="navbar-search">

                <input
                    type="text"
                    placeholder="Search products..."
                />

                <button>
                    <FaSearch />
                </button>

            </div>

            <div className="navbar-links">

                <Link to="/home">
                    Home
                </Link>

                <Link to="/products">
                    Products
                </Link>

                <Link to="/wishlist" className="nav-icon">
  <FaHeart />
</Link>

                <Link to="/cart">
    <FaShoppingCart />
</Link>

<Link to="/orders">
  📦 
</Link>

                <Link to="/profile">
                    <FaUser />
                </Link>

            </div>

        </nav>
    );
};

export default Navbar;