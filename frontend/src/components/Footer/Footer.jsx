import "./Footer.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      {/* <div className="footer-container">

        <div className="footer-section">
          <h2 className="footer-title">XPro</h2>
          <p className="footer-text">
            AI-powered e-commerce platform delivering a smarter shopping
            experience with personalized recommendations and seamless ordering.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>

          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/wishlist">Wishlist</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Follow Us</h3>

          <div className="footer-social">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaGithub /></a>
          </div>
        </div>

      </div> */}

      <div className="footer-bottom">
        © 2026 XPro. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;