import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGift, FaShoppingBag, FaShieldAlt, FaTruck } from "react-icons/fa";
import { apiUrl } from "../../api";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setRegistered] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onRegister = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    setLoading(true);

    try {
      const response = await fetch(apiUrl("/api/auth/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setRegistered(true);
        setMessage(data.message || "Account created successfully.");
        setName("");
        setEmail("");
        setPassword("");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setRegistered(false);
        setMessage(data.message || "Unable to create account.");
      }
    } catch (error) {
      console.error(error);
      setRegistered(false);
      setMessage("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <aside className="auth-showcase">
          <button className="auth-brand" onClick={() => navigate("/")} type="button">
            <FaShoppingBag aria-hidden="true" />
            <span>Mercart</span>
          </button>

          <div className="auth-showcase-copy">
            <p className="auth-kicker">Join Mercart</p>
            <h1>Create an account built for easier shopping.</h1>
            <p>
              Save your wishlist, review your orders, and move through checkout
              with less typing.
            </p>
          </div>

          <div className="auth-perks">
            <div>
              <FaGift aria-hidden="true" />
              <span>Personal wishlist</span>
            </div>
            <div>
              <FaTruck aria-hidden="true" />
              <span>Order tracking</span>
            </div>
            <div>
              <FaShieldAlt aria-hidden="true" />
              <span>Secure checkout</span>
            </div>
          </div>
        </aside>

        <section className="auth-card">
          <div className="auth-heading">
            <p>Create account</p>
            <h2>Start shopping faster</h2>
            <span>Enter your details to create your Mercart account.</span>
          </div>

          <form onSubmit={onRegister} className="auth-form">
            <div className="auth-field">
              <label htmlFor="register-name">Full name</label>
              <input
                id="register-name"
                type="text"
                value={name}
                placeholder="Your name"
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-email">Email address</label>
              <input
                id="register-email"
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-password">Password</label>
              <div className="auth-password">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Create a strong password"
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <small>Use 8+ characters with uppercase, number, and symbol.</small>
            </div>

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {submitted && message && (
            <p className={`auth-message ${isRegistered ? "success" : "error"}`}>
              {message}
            </p>
          )}

          <p className="auth-switch">
            Already have an account?
            <button type="button" onClick={() => navigate("/login")}>
              Sign in
            </button>
          </p>
        </section>
      </section>
    </main>
  );
};

export default Register;
