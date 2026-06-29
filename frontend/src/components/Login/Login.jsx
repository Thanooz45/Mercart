
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
// import {Link}

function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [isLogged,setLoggin]=useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState("");
    const navigate=useNavigate();

    const onLoggin=(event)=>{
        event.preventDefault();

        setSubmitted(true);

        const storedEmail = Cookies.get("email");
        const storedPassword = Cookies.get("password");
        if(!storedEmail || !storedPassword){
            setLoggin(false);
            setMessage("No account found. Please register first.");
            navigate("/register");
            return;
        }
        if(email === storedEmail && password === storedPassword){
            setLoggin(true);
            // log success
            setMessage("Login Successful");
            navigate("/home");
        }else {
            setLoggin(false);
            setMessage("Please enter the registered email and password.");
        }
     }


     const onChangeEmail=(event)=> setEmail(event.target.value);
     const onChangePassword=(event)=>setPassword(event.target.value);
     
     return(
        <div>
            <h1> Loggin</h1>
            <form onSubmit={onLoggin}>
                <input type="email" value={email} placeholder="E mail" onChange={onChangeEmail}></input>
                <input type="password" value={password} placeholder="password" onChange={onChangePassword}></input>
                <button type="submit"> login</button>
            
            </form>
            {/* {submitted && (
                <p>{isLogged ? "Login Successful" : "Invalid Login"}</p>
            )} */}
            {submitted && <p>{message}</p>}
        </div>
        
     )
    
}
export default Login;