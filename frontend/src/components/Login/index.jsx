import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Message } from "primereact/message";
import "./index.css";
import logo from "../../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const apiUrl = process.env.API_URL;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setEmailError(false);
      setPasswordError(false);
      const response = await axios.post(apiUrl + "auth/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-logo">
        <img src={logo} alt=""></img>
      </div>
      <div className="wrapper">
        <div className="title">
          <h2>Sign-In</h2>
        </div>

        <div className="form">
          <div className="inputfield">
            <label>Email</label>
            <input
              type="email"
              className="register_input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderColor: emailError ? "red" : "#D8E9EF" }}
            ></input>
          </div>
          <div className="inputfield">
            <label>Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                className="register_input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderColor: passwordError ? "red" : "#D8E9EF" }}
              ></input>
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
              </button>
            </div>
          </div>
          {error && (
            <Message
              severity="error"
              text={error}
              style={{ width: "100%", marginBottom: "10px" }}
            />
          )}
          <div className="inputfield">
            <input
              type="submit"
              value="Login"
              className="btn"
              onClick={handleSubmit}
            ></input>
          </div>
          <p>
            Don't have an account? <a href="/signup">Sign-Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
