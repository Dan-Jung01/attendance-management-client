import { NavLink } from "react-router-dom";
import { useAuthContext } from "providers/AuthProvider";
import "../css/sideNav.css";
import { MdLogout, MdOutlineDashboard, MdAccessTime, MdOutlineCalendarToday } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";

const SideNav = () => {
  const { logout } = useAuthContext();
  return (
    <nav>
      <div className="side-container">
        <div className="section logo">LLOOGG</div>
        <div className="section menu">
          <NavLink to="/admin" className="link" end>
            <div className="list">
              <MdOutlineDashboard className="icons" />
              <div>대시보드</div>
            </div>
          </NavLink>

          <NavLink to="work" className="link">
            <div className="list">
              <MdAccessTime className="icons" />
              <div>출퇴근 관리</div>
            </div>
          </NavLink>

          <NavLink to="leave" className="link">
            <div className="list">
              <MdOutlineCalendarToday className="icons" />
              <div>연차 관리</div>
            </div>
          </NavLink>

          <NavLink to="users" className="link">
            <div className="list">
              <RiUserSettingsLine className="icons" /> <div>사용자 관리</div>
            </div>
          </NavLink>

          <NavLink to="register" className="link">
            <div className="list">
              <AiOutlineUserAdd className="icons" /> <div>사용자 추가</div>
            </div>
          </NavLink>
        </div>
        <div className="section link btn-logout" onClick={() => logout(() => console.log("Logged out succesfully"))}>
          <MdLogout className="icons" /> <div>로그아웃</div>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
