import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-center text-bg-dark mx-0 py-3 bg-dark border-bottom shadow-sm">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <NavLink to="/" className="nav-link text-white" aria-current="page">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/about"
            className="nav-link text-white"
            aria-current="page"
          >
            About Us
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
