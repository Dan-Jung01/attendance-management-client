import React from "react";
import "../../css/header.css";

const Header = () => {
  function handleLogout() {
    // window.localStorage.clear()
    window.localStorage.removeItem("TOKEN");
    window.location.href = "/login";
  }

  return (
    <div className="main-header">
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Header;
