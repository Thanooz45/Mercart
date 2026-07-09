import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">

      <div className="hero-left">

        <span className="hero-tag">
          Welcome to XPro
        </span>

        <h1>
          Discover Amazing Products
        </h1>

        <p>
          Shop Electronics, Fashion, Home Essentials,
          Sports, Books and much more at the best prices.
        </p>

        <button
          onClick={() => navigate("/products")}
        >
          Shop Now
        </button>

      </div>

      <div className="hero-right">

        <img
          src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=900"
          alt="Shopping"
        />

      </div>

    </section>
  );
};

export default Hero;