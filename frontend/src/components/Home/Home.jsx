// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Profile from "../Profile/Profile.jsx";
// import "./Home.css";

// const Home = () => {
//   const [name, setName] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getProfile = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/user/profile",
//           {
//             credentials: "include",
//           }
//         );

//         const data = await response.json();

//         if (response.ok) {
//           setName(data.user.name);
//         } else {
//           navigate("/login");
//         }
//       } catch (err) {
//         console.error(err);
//         navigate("/login");
//       }
//     };

//     getProfile();
//   }, [navigate]);

//   const handleLogout = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/auth/logout",
//         {
//           method: "POST",
//           credentials: "include",
//         }
//       );

//       if (response.ok) {
//         navigate("/login");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="home-page">
//       <h1>Home</h1>
//       <p>Welcome {name}</p>

//       <Profile />

//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Home;

import { useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="home-page">
      <h1>Home</h1>

      <Profile />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;