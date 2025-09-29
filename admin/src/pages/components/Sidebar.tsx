import {
  BiSolidMessageRoundedCheck,
  BiSolidMessageRoundedDetail,
} from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";

import { FaTachometerAlt, FaWhatsapp } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

import { IoAddCircle, IoPeople } from "react-icons/io5";
import {
  MdMessage,
  MdOutlineCalendarViewMonth,
  MdOutlineError,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 mx-0 p-3 text-bg-dark min-vh-100">
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
          <NavLink to="/" className="nav-link text-white" aria-current="page">
            <FaTachometerAlt className="me-2" />
            Home
          </NavLink>
        </li>
        <li>
          <Link
            className="nav-link data-toggle text-white"
            data-bs-toggle="collapse"
            to="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <FaWhatsapp className="me-2" />
            Messages
            <IoMdArrowDropdown />
          </Link>
          <div className="collapse" id="collapseExample">
            <ul className="nav nav-pill ">
              <li>
                <NavLink
                  to="/tracker-requests"
                  className="nav-link text-white"
                  aria-current="page"
                >
                  <MdMessage className="me-2" />
                  Trackers Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sent-messages"
                  className="nav-link text-white"
                  aria-current="page"
                >
                  <BiSolidMessageRoundedCheck className="me-2" />
                  Sent
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recieved-messages"
                  className="nav-link  text-white"
                  aria-current="page"
                >
                  <BiSolidMessageRoundedDetail className="me-2" />
                  Recieved
                </NavLink>
              </li>
            </ul>
          </div>
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
        <li>
          <Link
            className="nav-link data-toggle text-white"
            data-bs-toggle="collapse"
            to="#collapseWebsites"
            role="button"
            aria-expanded="false"
            aria-controls="collapseWebsites"
          >
            <CgWebsite className="me-2" />
            Websites
            <IoMdArrowDropdown />
          </Link>
          <div className="collapse" id="collapseWebsites">
            <ul className="nav nav-pill ">
              <li>
                <NavLink
                  to="/websites"
                  className="nav-link text-white"
                  aria-current="page"
                >
                  <MdOutlineCalendarViewMonth className="me-2" />
                  View
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/websites-add"
                  className="nav-link text-white"
                  aria-current="page"
                >
                  <IoAddCircle className="me-2" />
                  Add
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <NavLink to="/errors" className="nav-link text-white">
            <MdOutlineError className="me-2" />
            Errors
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
            <Link className="dropdown-item" to="#">
              New project...
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Settings
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
