import {useState} from "react"
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import "./Register.css";
const Register=()=>{
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[isRegistered,setRegistered]=useState(false);
    const [submitted, setSubmitted] = useState(false);
    const navigate=useNavigate();


    const [message, setMessage] = useState("");

    const onRegister = async (event) => {
        event.preventDefault();
        setSubmitted(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
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
                setMessage(data.message);

                setName("");
                setEmail("");
                setPassword("");

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {
                setRegistered(false);
                setMessage(data.message);
            }
        } catch (error) {
            console.error(error);
            setRegistered(false);
            setMessage("Server Error");
        }
    };


    const onChangeName=(event)=> setName(event.target.value);
    const onChangeEmail=(event)=> setEmail(event.target.value);
    const onChangePassword=(event)=> setPassword(event.target.value);

    return(
    <div className="login-page">
        <div className="auth-container">

            <h1 className="auth-title">Register</h1>

            <p className="auth-subtitle">
                Create your X-Pro account
            </p>

            <form onSubmit={onRegister}>

                <div className="input-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        placeholder="Enter your name"
                        onChange={onChangeName}
                        required
                    />
                </div>

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
                        placeholder="Create a password"
                        onChange={onChangePassword}
                        required
                    />
                </div>

                <button className="auth-btn" type="submit">
                    Register
                </button>

            </form>

            {submitted && (
                <p className={`message ${isRegistered ? "success" : "error"}`}>
                    {message}
                </p>
            )}

            <p className="auth-footer">
                Already have an account?
                <span onClick={() => navigate("/login")}>
                    Login
                </span>
            </p>

        </div>
    </div>
);
}

export default Register;
