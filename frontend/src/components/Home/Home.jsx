import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import CategorySection from "../CategorySection/CategorySection";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import Footer from "../Footer/Footer";
import { apiUrl } from "../../api";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(
          apiUrl("/api/user/profile"),
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          navigate("/login");
          return;
        }

        setUser(data);
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    };

    getProfile();
  }, [navigate]);

  return (
    <div className="home-page">

      <Navbar user={user} />

      <Hero />

      <CategorySection />

      <FeaturedProducts />

      <Footer />

    </div>
  );
};

export default Home;
