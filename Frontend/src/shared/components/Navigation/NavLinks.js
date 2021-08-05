import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL CARS
        </NavLink>
      </li>
      <li>
        <NavLink to="/add" exact>
          ADD CAR
        </NavLink>
      </li>
      <li>
        <NavLink to={`/search`}>SEARCH CAR</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
