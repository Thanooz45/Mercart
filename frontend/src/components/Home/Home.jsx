import Cookies from "js-cookie";
import Profile from "../Profile/Profile.jsx"
import "./Home.css";
const Home = () => {
  const name=Cookies.get("name");
    return (
      <div className="home-page">
        <h1>Home</h1>
        <p> welcome {name}</p>
        <Profile  />
      </div>
    );
  };
  
  export default Home;
