import { useEffect, useState } from "react";
import { adminExists } from "../../services/api";
import RegisterComponent from "./RegisterComponent";
import LoginComponent from "./LoginComponent";

const Login = () => {
  const [newAdmin, setNewAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await adminExists();
      if (response === false) {
        setNewAdmin(true);
      } else {
        setNewAdmin(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5 min-vh-100"
        tabIndex={-1}
        role="dialog"
        id="modalSignin"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-4 shadow">
            {newAdmin ? <RegisterComponent /> : <LoginComponent />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
