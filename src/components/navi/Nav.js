import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/nav.css";
import { AiFillHome } from "react-icons/ai";
import { RiChatHistoryFill } from "react-icons/ri";

const Navigation = () => {
  return (
    <ul className="nav-container">
      <li>
        <NavLink exact to="/" className="nav-link" activeClassName="active">
          <AiFillHome />
        </NavLink>
      </li>
      <li>
        <NavLink to="/record" className="nav-link" activeClassName="active">
          <RiChatHistoryFill />
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
