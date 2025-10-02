const RegisterComponent = () => {
  return (
    <>
      <div className="modal-header p-5 pb-4 border-bottom-0">
        <h1 className="fw-bold mb-0 fs-2">Register</h1>
      </div>
      <div className="modal-body p-5 pt-0">
        <form method="post">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control rounded-3"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control rounded-3"
              id="floatingInput"
              placeholder="Username"
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control rounded-3"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
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
