import "./Hero.css";

const Hero = () => {
    return (
        <section className="hero">

            <div className="hero-left">

                <h1>Discover Amazing Products</h1>

                <p>
                    Shop electronics, fashion, home essentials and much more.
                </p>

                <button>Shop Now</button>

            </div>

            <div className="hero-right">
    <img
        src="https://images.unsplash.com/photo-1512436991641-6745cdb1723?auto=format&fit=crop&w=800&q=80"
        alt="shopping"
    />
</div>

        </section>
    );
};

export default Hero;