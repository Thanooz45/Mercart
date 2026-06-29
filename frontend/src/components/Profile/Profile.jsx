import Cookies from "js-cookie";
import {useState} from "react"
import UpdateProfile from "../Profile/UpdateProfile.jsx"

const Profile=()=>{
    const [edit,setEdit]=useState(false);
    const name=Cookies.get("name");
    const email=Cookies.get("email");
    // const age=Cookies.get("email");
    const onUpdateProfile=()=>{
        setEdit(true);
    }
    return(<div>
        {edit ? (<UpdateProfile onSave={()=> setEdit(false)} />):
        (<>
        <h3>name : {name}</h3>
            <h2>Email : {email}</h2>
            {/* <h2>age : {age}</h2> */}
            <button onClick={onUpdateProfile}>update profile</button></>
        )
        }
        
    </div>);
}
export default Profile;
