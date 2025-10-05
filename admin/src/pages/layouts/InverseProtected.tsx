import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { checking, login, logout } from "../../redux/LoginSlice";
import { isLoggedIn } from "../../services/auth";
import { useEffect, type PropsWithChildren } from "react";

/**
 * A route guard component that restricts access to authentication pages for logged-in users.
 *
 * This component checks if the user is already authenticated:
 * - If the user is logged in, they are redirected to the home page.
 * - If the user is not logged in, the login (or signup) page is rendered.
 *
 * @component
 * @param {PropsWithChildren} props - The component props containing child elements.
 * @returns {JSX.Element} A route element that either renders its children or redirects to the home page.
 */

const InverseProtected = ({ children }: PropsWithChildren) => {
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

  return !userStatus ? children : <Navigate to="/" replace />;
};

export default InverseProtected;
