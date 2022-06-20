import React, { memo } from "react";
import "../../css/header.css";
import { MdLogout } from "react-icons/md";
import { useAuthContext } from "providers/AuthProvider";

const Header = memo(() => {
  const { user, logout } = useAuthContext();

  return (
    <div className="main-header">
      <div className="logo">{user.user_name}</div>
      <MdLogout className="btn-logOut" onClick={() => logout(() => console.log("Logged out succesfully"))} />
    </div>
  );
});

export default Header;
