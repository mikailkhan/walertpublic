import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom shadow-sm">
      <NavLink
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-primary text-decoration-none"
      >
        <svg className="bi me-2" width="40" height="32" aria-hidden="true">
          {/* <use xlink:to="#bootstrap"></use> */}
        </svg>
        <span className="fs-4 primary">Walert</span>
      </NavLink>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <NavLink to="/" className="nav-link active" aria-current="page">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link" aria-current="page">
            About Us
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contact" className="nav-link" aria-current="page">
            Contact
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
