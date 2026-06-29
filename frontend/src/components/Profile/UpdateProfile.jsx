import {useState} from "react";
import Cookies from "js-cookie";
// import {useNavigate} from "react-router-dom";


const UpdateProfile =({onSave})=>{
    const [name,setName]=useState(Cookies.get("name")|| "");
    const [email,setEmail]=useState(Cookies.get("email")|| "");
    const [password,setPassword] =useState(Cookies.get("password") || "");
// const navigate=useNavigate();

    const onUpdation=()=>{
        Cookies.set("name",name,{expires:1});
        Cookies.set("email",email,{expires:1});
        Cookies.set("password",password,{expires:1});
        alert("Profile Updated Succssfully..");
        onSave();
    }
    return (
        <>
        <h2> profile updation</h2>
        <label>Name</label>
        <br />
        <input type="text" value={name} onChange={(e)=> setName(e.target.value)} />
        <br/><br />
        <label>Email</label>
        <br />
        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
        <br />
        <label>Password</label>
        <br />
        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
        <button onClick={onUpdation}> save changes</button>
        </>
    )
    
}


export default UpdateProfile;