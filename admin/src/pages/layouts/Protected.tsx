import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { checking, login, logout } from "../../redux/LoginSlice";
import { isLoggedIn } from "../../services/auth";
import { useEffect } from "react";

/**
 * A higher-order component that protects routes requiring authentication.
 *
 * This component checks whether the user is currently authenticated.
 * - If authenticated, it renders the child routes (protected content).
 * - If not authenticated, it redirects the user to the login page.
 *
 * @component
 * @returns {JSX.Element} The protected route element that either renders its children
 * or navigates to the login route based on authentication status.
 */
const Protected = () => {
  // gets value from store
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

  // Prevents premature redirection by waiting until the authentication status is verified.
  // This ensures the app doesn't navigate to the login page while the user's session is still being checked.
  if (loading) {
    return <div>Loading...</div>;
  }

  return userStatus ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Protected;
