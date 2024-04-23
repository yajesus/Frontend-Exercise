import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/allinone.css";
interface LoginResponse {
  token: string;
}

const Login: React.FC = () => {
  //state to collect user info
  const [error, setError] = useState<string>("");
  const [logemailerror, setLogemailerror] = useState<string>("");
  const [logpassworderror, setLogpassworderror] = useState<string>("");
  const [showlogemailerror, setShowlogemailerror] = useState<boolean>(false);
  const [invalidemail, setInvalidemail] = useState<boolean>(false);
  const [showlogpassworderror, setShowlogpassworderror] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const handlechangelogemail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLogemailerror(e.target.value);
  };
  const handlechangelogepassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLogpassworderror(e.target.value);
  };
  const handleLogin = async () => {
    //check inputs
    if (logemailerror == "") {
      setShowlogemailerror(!showlogemailerror);
      setTimeout(() => {
        setShowlogemailerror(false);
      }, 1000);
    } else if (logpassworderror == "") {
      setShowlogpassworderror(!showlogpassworderror);
      setTimeout(() => {
        setShowlogpassworderror(false);
      }, 1000);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(logemailerror)) {
      setInvalidemail(!invalidemail);
      setTimeout(() => {
        setInvalidemail(false);
      }, 1000);
    } else
      try {
        //api call
        const response = await axios.post<LoginResponse>(
          "http://143.198.168.244:3000/api/users/login",
          {
            email: logemailerror,
            password: logpassworderror,
          }
        );
        // Store user information in local storage
        const userData = response.data;
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/home", { state: { userData } });
        const token = response.data.token;
        localStorage.setItem("token", token);
        setError("");
        console.log(response.data);

        console.log("login success", token);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "some thing went wrong";
        console.error("Login error:", error);
        setError(errorMessage);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
  };

  return (
    <div className="login_contain">
      <div className="loginheder_contain">
        <h1>Login</h1>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="loginmiddle_contain">
        <div className="loginemail_contain">
          <label>Email:</label>
          <input
            type="email"
            onChange={handlechangelogemail}
            className="lastname_input"
          />
        </div>
        {showlogemailerror && <p className="error">enter email</p>}
        {invalidemail && <p className="error">invalid email</p>}
        <div className="loginpassword_contain">
          <label>Password:</label>
          <input
            type="password"
            onChange={handlechangelogepassword}
            className="lastname_input"
          />
        </div>
        {showlogpassworderror && <p className="error">enter password</p>}
      </div>
      <button onClick={handleLogin} className="btn">
        Login
      </button>
    </div>
  );
};

export default Login;
