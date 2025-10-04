import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../../redux/LoginSlice";

const Logout = () => {
  const dispatch = useDispatch();

  localStorage.removeItem("walert_token");
  dispatch(logout());

  return <Navigate to="login" />;
};

export default Logout;
