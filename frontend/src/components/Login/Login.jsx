import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [submitted,setSubmitted]=useState(false);
    const [message,setMessage]=useState("");

    const navigate=useNavigate();

    const onLoggin=async (event) => {
        event.preventDefault();
        setSubmitted(true);

        try {
            const response=await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data=await response.json();

            if (response.ok) {
                setMessage(data.message);

                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            } else {
                setMessage(data.message);

                if (data.message === "User not found") {
                    setTimeout(()=>{
                        navigate("/register");
                    }, 1500);
                }
            }
        } catch(error){
            console.error(error);
            setMessage("Server Error");
        }
    };

    const onChangeEmail=(event)=>setEmail(event.target.value);

    const onChangePassword=(event)=>setPassword(event.target.value);

    return (
        <div className="login-page">
            <div className="auth-container">
                {/* <h1 className="auth-title">Welcome Back 👋</h1> */}
                <h1 className="auth-title">Sign in</h1>
                <p className="auth-subtitle">Use your credentials to continue</p>
                <form onSubmit={onLoggin}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChangeEmail}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={onChangePassword}
                            required
                        />
                    </div>
                    <button className="auth-btn" type="submit">
                        Login
                    </button>
                </form>

                {submitted && (
                    <p className="message">
                        {message}
                    </p>
                )}

                <p className="auth-footer">
                    Don't have an account?
                    <span onClick={() => navigate("/register")}>
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;