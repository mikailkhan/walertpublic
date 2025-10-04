import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { checking, login, logout } from "../../redux/LoginSlice";
import { isLoggedIn } from "../../services/auth";
import { useEffect } from "react";

const Protected = () => {
  const { value: userStatus, loading } = useSelector(
    (state: RootState) => state.userLoginState
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const checkStatus = async () => {
      dispatch(checking());
      const userLogged = await isLoggedIn();
      if (userLogged) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
    };

    checkStatus();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return userStatus ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Protected;
