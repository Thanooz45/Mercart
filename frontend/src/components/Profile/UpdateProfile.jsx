import { useEffect, useState } from "react";
// import "./UpdateProfile.css";

const UpdateProfile = ({ onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          setName(data.user.name);
          setEmail(data.user.email);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getProfile();
  }, []);

  const onUpdation = async () => {
    // API Call
  };

  return (
    <div className="update-profile-container">
      <h2 className="update-profile-title">Update Profile</h2>

      <div className="update-input-group">
        <label className="update-label">Name</label>
        <input
          className="update-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="update-input-group">
        <label className="update-label">Email</label>
        <input
          className="update-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="update-input-group">
        <label className="update-label">New Password</label>
        <input
          className="update-input"
          type="password"
          placeholder="Leave empty to keep current password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="update-btn-container">
        <button
          className="save-btn"
          onClick={onUpdation}
        >
          Save Changes
        </button>

        <button
          className="cancel-btn"
          onClick={onSave}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;