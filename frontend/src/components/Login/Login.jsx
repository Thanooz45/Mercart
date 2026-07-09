import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaShoppingBag, FaShieldAlt, FaTruck } from "react-icons/fa";
import { apiUrl } from "../../api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onLogin = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage(data.message || "Login successful.");
        setMessageType("success");

        setTimeout(() => {
          navigate("/home");
        }, 900);
      } else {
        setMessage(data.message || "Unable to login.");
        setMessageType("error");

        if (data.message === "User not found") {
          setTimeout(() => {
            navigate("/register");
          }, 1500);
        }
      }
    } catch (error) {
      console.error(error);
      setMessage("Server Error");
      setMessageType("error");
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
            <p className="auth-kicker">Welcome back</p>
            <h1>Shop smarter with your Mercart account.</h1>
            <p>
              Track orders, save favourites, and checkout faster every time you
              visit.
            </p>
          </div>

          <div className="auth-perks">
            <div>
              <FaTruck aria-hidden="true" />
              <span>Fast delivery updates</span>
            </div>
            <div>
              <FaShieldAlt aria-hidden="true" />
              <span>Secure account access</span>
            </div>
          </div>
        </aside>

        <section className="auth-card">
          <div className="auth-heading">
            <p>Sign in</p>
            <h2>Continue shopping</h2>
            <span>Use your email and password to access your account.</span>
          </div>

          <form onSubmit={onLogin} className="auth-form">
            <div className="auth-field">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <div className="auth-password">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter your password"
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
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
            </div>

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {submitted && message && (
            <p className={`auth-message ${messageType}`}>{message}</p>
          )}

          <p className="auth-switch">
            New to Mercart?
            <button type="button" onClick={() => navigate("/register")}>
              Create account
            </button>
          </p>
        </section>
      </section>
    </main>
  );
}

export default Login;
