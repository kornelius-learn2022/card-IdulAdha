import Users from "./adminUser";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaUserAlt,
  FaBookmark,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";
import "../css/sidebar.css";
const Sidebar = () => {
  const [opened, setOpened] = useState(false);
  const toogle = () => {
    setOpened(!opened);
  };
  return (
    <div className="containerSidebar">
      <div className="sidebar" style={{ width: opened ? "3vw" : "22vw" }}>
        <div className="bars">
          <FaBars onClick={toogle} />
        </div>
        <div className="bars">
          <div className="profile">
            <div className="profile-icon">
              <FaUserAlt />
            </div>
          </div>
        </div>

        <div className="bars" activeclassname="bars">
          <NavLink to="/admin">
            <p className="subtitle">
              <Users />
            </p>
          </NavLink>
        </div>
        <div className="bars" activeclassname="bars">
          <NavLink to="/akun">
            <div className="icon">
              <FaUserAlt />
            </div>
            <div className="Nav-akun">
              <p className="subtitle">Akun</p>
            </div>
          </NavLink>
        </div>
        <div className="bars" activeclassname="bars">
          <NavLink to="/cardUsers">
            <div className="icon">
              <FaBookmark />
            </div>
            <p className="subtitle">Card Users</p>
          </NavLink>
        </div>
        <div className="bars" activeclassname="bars">
          <NavLink to="/editCardUsers">
            <div className="icon">
              <FaEdit />
            </div>
            <p className="subtitle">Edit Card Users</p>
          </NavLink>
        </div>
        <div className="bars" activeclassname="bars">
          <NavLink to="/keluar">
            <div className="icon">
              <FaSignOutAlt />
            </div>
            <p className="subtitle">Keluar</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
