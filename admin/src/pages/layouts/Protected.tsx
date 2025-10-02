import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../../services/auth";
import { useEffect, useState } from "react";

const Protected = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean);

  useEffect(() => {
    const loginStatus = async () => {
      setIsAuthenticated(await isLoggedIn());
    };

    loginStatus();
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Protected;
