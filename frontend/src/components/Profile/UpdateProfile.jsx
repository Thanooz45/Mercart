import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { apiUrl } from "../../api";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          setName(data.name || "");
          setEmail(data.email || "");
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        apiUrl("/api/user/profile"),
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Profile updated successfully.");
        navigate("/profile");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="update-container">
        <div className="update-card">

          <h1>Update Profile</h1>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Leave blank if you don't want to change it"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="button-group">
              <button
                type="button"
                className="back-btn"
                onClick={() => navigate("/profile")}
              >
                Back
              </button>

              <button
                type="submit"
                className="save-btn"
              >
                Save Changes
              </button>
            </div>

          </form>

        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
