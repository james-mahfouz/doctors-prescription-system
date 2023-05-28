import logo from "../../assets/logo-white-01.png";
import "./index.css";
import DisplayUsers from "../DisplayUsers";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [adminFunction, setAdminFunction] = useState(<DisplayUsers />);
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAdminName = () => {
      const admin_name = localStorage.getItem("admin_name");
      if (admin_name) {
        setAdminName(admin_name);
      } else {
        setTimeout(getAdminName, 1000); // check again after 1 second
      }
    };
    getAdminName();
  }, []);

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
          <div className="option" onClick={() => handleOption(2)}>
            <h4>Display Users</h4>
          </div>
        </div>
      </section>

      <section className="right">
        <div className="top-bar">
          <div className="admin-name">
            <h3>{adminName}</h3>
          </div>
          <div className="logout-btn">
            <h4>Logout</h4>
          </div>
        </div>

        <div className="infos">{adminFunction}</div>
      </section>
    </div>
  );
};

export default Admin;
