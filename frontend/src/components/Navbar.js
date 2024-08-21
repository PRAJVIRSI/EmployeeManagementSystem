import React from "react";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <nav className="navbar">
      <div className="navdiv" >
        <div className="navlinks">
          <ul >
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Directory
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link">
                Add Employee
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
