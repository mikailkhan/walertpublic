import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/api";
import { login } from "../../redux/LoginSlice";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const adminLogged = await register({ username, password, email });

    if (adminLogged) {
      dispatch(login());
      navigate("/");
    } else {
      setRegistrationFailed(true);
      setMessage("❌ Something went wrong from server.");
    }
  };
  return (
    <>
      <div className="modal-header p-5 pb-4 border-bottom-0">
        <h1 className="fw-bold mb-0 fs-2">Register</h1>
      </div>
      <div className="modal-body p-5 pt-0">
        <form method="post" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control rounded-3"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email</label>
          </div>
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
          {registrationFailed && (
            <div className="alert alert-danger">
              <p>{message}</p>
            </div>
          )}
          <button
            className="w-100 mb-2 btn btn-lg text-white rounded-3 btn-primary"
            type="submit"
          >
            Register
          </button>
          <small className="text-body-secondary">
            By clicking Registering, you agree to the terms of use.
          </small>
          <hr className="my-4" />
        </form>
      </div>
    </>
  );
};

export default RegisterComponent;
