import React from "react";
import { Link } from "react-router-dom";
import "../../css/nav.css";

const Navigation = () => {
  return (
    <ul className="nav-container">
      <li>
        <Link to="/" className="nav-link">
          마이페이지
        </Link>
      </li>
      <li>
        <Link to="/record" className="nav-link">
          메뉴2
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
