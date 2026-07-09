import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { apiUrl } from "../../api";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(
          apiUrl("/api/user/profile"),
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getProfile();
  }, []);

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div className="profile-card">
          <h1>My Profile</h1>

          <div className="profile-field">
            <label>Name</label>
            <input
              type="text"
              value={user.name}
              readOnly
            />
          </div>

          <div className="profile-field">
            <label>Email</label>
            <input
              type="text"
              value={user.email}
              readOnly
            />
          </div>

          <div className="profile-buttons">
            <button
              className="home-btn"
              onClick={() => navigate("/home")}
            >
              ← Back to Home
            </button>

            <button
              className="edit-btn"
              onClick={() => navigate("/profile/update")}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
