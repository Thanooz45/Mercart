import {useState} from "react"
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
const Register=()=>{
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[isRegistered,setRegistered]=useState(false);
    const [submitted, setSubmitted] = useState(false);
    const navigate=useNavigate();
    const onRegister=(event)=>{
        event.preventDefault();
        setSubmitted(true);
        if(name!=="" && email!=="" && password.length >=6){
            setRegistered(true);
            Cookies.set("name", name);
            Cookies.set("email", email);
            Cookies.set("password", password);
            console.log("registered");
            navigate("/");
        }
        else{
            setRegistered(false);
            alert("reg failed");
            console.log("Not Registered");
            //redirect to registerd
        }
    }
    const onChangeName=(event)=> setName(event.target.value);
    const onChangeEmail=(event)=> setEmail(event.target.value);
    const onChangePassword=(event)=> setPassword(event.target.value);

    return(
        <div>
            <h1> register</h1>
            <form onSubmit={onRegister}>
            <input type="text" value={name} placeholder="Name" onChange={onChangeName}></input>
            <input type="email" value={email} placeholder="email" onChange={onChangeEmail}></input>
            <input type="password" value={password} placeholder="password" onChange={onChangePassword}></input>
            <button type="submit">register</button>
            </form>
            {submitted && (
                <p>{isRegistered ? "Registered" : "Not Registered"}</p>
                )}
            
        </div>
    )
}

export default Register;
