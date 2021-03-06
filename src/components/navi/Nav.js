import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RiChatHistoryFill } from "react-icons/ri";
import "../../css/nav.css";

const Navigation = () => {
  return (
    <ul className="nav-container">
      <li>
        <NavLink to="/" style={({ isActive }) => ({ color: isActive ? "orange" : null })}>
          <AiFillHome />
        </NavLink>
      </li>
      <li>
        <NavLink to="record" style={({ isActive }) => ({ color: isActive ? "orange" : null })}>
          <RiChatHistoryFill />
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
