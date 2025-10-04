import React, { useState } from "react";
import { apiLogin } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/LoginSlice";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const adminLogged = await apiLogin({ username, password });

    if (adminLogged.status === "successful") {
      dispatch(login());
      navigate("/");
    } else {
      setLoginFailed(true);
      setMessage(adminLogged.message);
    }
  };

  return (
    <>
      <div className="modal-header p-5 pb-4 border-bottom-0">
        <h1 className="fw-bold mb-0 fs-2">Login To Admin Panel</h1>
      </div>
      <div className="modal-body p-5 pt-0">
        <form method="post" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control rounded-3"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control rounded-3"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
          {loginFailed && <div className="alert alert-danger">{message}</div>}
          <button
            className="w-100 mb-2 btn btn-lg text-white rounded-3 btn-primary"
            type="submit"
          >
            Login
          </button>

          <small className="text-body-secondary">
            By clicking login, you agree to the terms of use.
          </small>
          <hr className="my-4" />
        </form>
      </div>
    </>
  );
};

export default LoginComponent;
