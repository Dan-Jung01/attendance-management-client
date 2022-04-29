import React from "react";
import "../../css/header.css";
import { MdLogout } from "react-icons/md";

const Header = () => {
  function handleLogout() {
    // window.localStorage.clear()
    window.localStorage.removeItem("TOKEN");
    window.location.href = "/login";
  }

  return (
    <div className="main-header">
      <div className="logo">logo</div>
      <MdLogout className="btn-logOut" onClick={handleLogout} />
    </div>
  );
};

export default Header;
