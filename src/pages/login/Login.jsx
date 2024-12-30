import React, { useContext, useState } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Login() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, isFetching } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({ email: email, password: password }, dispatch);
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">The Gram</h3>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              minLength={6}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <Link to="/forgotPassword">
              <span className="loginForgot">Forgot Password</span>
            </Link>
            <Link to="/register">
              <button className="loginRegisterButton">
                {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Create a new Account"
                )}
              </button>
            </Link>
          </form>
          <div className="socialTextContainer">
            <span className="textContainer">Get the App</span>
          </div>
          <div className="soacialAppContainer">
            <img
              src={`${PF}person/google.png`}
              alt="img"
              className="socialApp"
            />
            <img
              src={`${PF}person/microsoft.png`}
              alt="img"
              className="socialApp1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
