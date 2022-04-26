import React from "react";
import SideNav from "./SideNav";

const AdminContainer = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "calc(100% - 250px)" }}>
        {children}
      </div>
    </div>
  );
};

export default AdminContainer;
