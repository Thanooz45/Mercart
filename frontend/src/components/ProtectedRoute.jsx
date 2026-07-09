import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiUrl } from "../api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch(apiUrl("/api/user/profile"), {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      })
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return authenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
