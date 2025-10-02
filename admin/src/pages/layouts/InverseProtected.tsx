import { Navigate } from "react-router-dom";
import type { PropsWithChildren } from "react";
import { isLoggedIn } from "../../services/auth";

// If logged In then redirect from login to home
const InverseProtected = ({ children }: PropsWithChildren) => {
  return !isLoggedIn() ? children : <Navigate to="/" />;
};

export default InverseProtected;
