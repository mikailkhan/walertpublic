import { FaTachometerAlt, FaWhatsapp } from "react-icons/fa";

import { IoPeople } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 mx-0 p-3 text-bg-dark min-vh-100"
      style={{ width: "280px;" }}
    >
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">
          <FaTachometerAlt className="me-2" /> Dashboard
        </span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/" className="nav-link active" aria-current="page">
            <FaTachometerAlt className="me-2" />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/messages" className="nav-link text-white">
            <FaWhatsapp className="me-2" />
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="nav-link text-white">
            <MdProductionQuantityLimits className="me-2" />
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/customers" className="nav-link text-white">
            <IoPeople className="me-2" />
            Customers
          </NavLink>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <NavLink
          to="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </NavLink>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <NavLink className="dropdown-item" to="#">
              New project...
            </NavLink>
          </li>
          <li>
            <NavLink className="dropdown-item" to="#">
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink className="dropdown-item" to="#">
              Profile
            </NavLink>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <NavLink className="dropdown-item" to="#">
              Sign out
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
