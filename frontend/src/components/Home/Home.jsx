import Cookies from "js-cookie";
import Profile from "../Profile/Profile.jsx"

const Home = () => {
  const name=Cookies.get("name");
    return (
      <div>
        <h1>Home</h1>
        <p> welcome {name}</p>
        <Profile  />
      </div>
    );
  };
  
  export default Home;
