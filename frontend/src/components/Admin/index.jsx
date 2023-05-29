import logo from "../../assets/logo-white-01.png";
import "./index.css";
import DisplayUsers from "../DisplayUsers";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [adminFunction, setAdminFunction] = useState(<DisplayUsers />);
  const [adminName, setAdminName] = useState("James");
  const navigate = useNavigate();

  const goLanding = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin_name");
    navigate("/login");
  };
  return (
    <div className="admin-body">
      <section className="left">
        <div className="admin-logo" onClick={goLanding}>
          <img src={logo} alt="" />
        </div>
        <div className="options">
          <div className="option">
            <h4>Display Patients</h4>
          </div>
        </div>
      </section>

      <section className="right">
        <div className="top-bar">
          <div className="admin-name">
            <h3>{adminName}</h3>
          </div>
          <div className="logout-btn">
            <h4 onClick={handleLogout}>Logout</h4>
          </div>
        </div>

        <div className="infos">{adminFunction}</div>
      </section>
    </div>
  );
};

export default Admin;
