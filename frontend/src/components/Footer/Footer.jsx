import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-brand">
          <h2 className="footer-title">XPro</h2>
          <p className="footer-text">
            A smarter ecommerce experience for discovering products, saving
            favourites, and managing orders in one place.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Shop</h3>
          <ul className="footer-links">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Account</h3>
          <ul className="footer-links">
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="footer-social">
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://github.com" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">© 2026 XPro. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
