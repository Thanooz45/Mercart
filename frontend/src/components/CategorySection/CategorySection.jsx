import "./CategorySection.css";
import { useNavigate } from "react-router-dom";

import {
  FaLaptop,
  FaTshirt,
  FaCouch,
  FaFootballBall,
  FaBook,
} from "react-icons/fa";

function CategorySection() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Electronics",
      icon: <FaLaptop />,
    },
    {
      name: "Fashion",
      icon: <FaTshirt />,
    },
    {
      name: "Home",
      icon: <FaCouch />,
    },
    {
      name: "Sports",
      icon: <FaFootballBall />,
    },
    {
      name: "Books",
      icon: <FaBook />,
    },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="categories">

      <div className="section-title">
        <h2>Shop by Category</h2>
        <p>Explore our most popular collections</p>
      </div>

      <div className="category-grid">
        {categories.map((item) => (
          <div
            key={item.name}
            className="category-card"
            onClick={() => handleCategoryClick(item.name)}
          >
            <div className="category-icon">
              {item.icon}
            </div>

            <h3>{item.name}</h3>
          </div>
        ))}
      </div>

    </section>
  );
}

export default CategorySection;