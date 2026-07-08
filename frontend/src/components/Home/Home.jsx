import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import CategorySection from "../../components/CategorySection/CategorySection";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Footer from "../../components/Footer/Footer";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/profile",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    getProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home-page">

      <Navbar />

      <Hero />

      <CategorySection />

      <FeaturedProducts />

      <Footer />

    </div>
  );
};

export default Home;