import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom shadow-sm">
      <NavLink
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-auto text-primary text-decoration-none"
      >
        <img
          src={Logo}
          alt="walert"
          className="bi ms-2"
          width="40"
          height="32"
          aria-hidden="true"
        />

        <span className="fs-4 primary">alert</span>
      </NavLink>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <NavLink to="/" className="nav-link" aria-current="page">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link" aria-current="page">
            About Us
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
