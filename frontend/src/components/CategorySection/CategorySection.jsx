import "./CategorySection.css";

const categories = [
    "Electronics",
    "Fashion",
    "Mobiles",
    "Books",
    "Home",
    "Sports"
];

const CategorySection = () => {
    return (
        <section className="category">

            <h2>Shop by Category</h2>

            <div className="category-grid">

                {categories.map((item) => (
                    <div className="category-card" key={item}>
                        {item}
                    </div>
                ))}

            </div>

        </section>
    );
};

export default CategorySection;