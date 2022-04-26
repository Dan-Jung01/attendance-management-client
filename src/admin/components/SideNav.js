import React from "react";
import { NavLink } from "react-router-dom";
import "../css/sideNav.css";

const SideNav = () => {
  return (
    <div>
      <div className="side-container">
        <div className="menu">
          <NavLink to={"/admin"} className="link" activeClassName={"selected"}>
            <div>Current Status</div>
          </NavLink>

          <NavLink to={"/admin-work"} className="link" activeClassName={"selected"}>
            <div>Work History</div>
          </NavLink>

          <NavLink to={"/admin-leave"} className="link" activeClassName={"selected"}>
            <div>Leave History</div>
          </NavLink>

          <NavLink to={"/admin-users"} className="link" activeClassName={"selected"}>
            <div>User Management</div>
          </NavLink>

          <NavLink to={"/admin-register"} className="link" activeClassName={"selected"}>
            <div>Add User</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
