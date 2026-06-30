import { useEffect, useState } from "react";
import UpdateProfile from "./UpdateProfile";
import "./Profile.css";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/profile",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getProfile();
  }, []);

  return (
    <div className="profile-container">
      {edit ? (
        <UpdateProfile
          user={user}
          onSave={() => setEdit(false)}
        />
      ) : (
        <>
          <h2 className="profile-title">My Profile</h2>

          <div className="profile-card">
            <div className="profile-row">
              <span className="profile-label">Name</span>
              <span className="profile-value">{user.name}</span>
            </div>

            <div className="profile-row">
              <span className="profile-label">Email</span>
              <span className="profile-value">{user.email}</span>
            </div>

            <button
              className="profile-btn"
              onClick={() => setEdit(true)}
            >
              Update Profile
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;