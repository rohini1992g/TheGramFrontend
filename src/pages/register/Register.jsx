import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Register() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      email: email,
      password: password,
    };
    try {
      await axios.post("http://localhost:8000/api/auth/register", user, {
        withCredentials: true,
      });

      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">The Gram</h3>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              type="text"
              placeholder="Username"
              className="registerInput"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="registerInput"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="registerInput"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <Link to="/login">
              <button className="registerRegisterButton">
                Log In into Account
              </button>
            </Link>
          </form>
          <div className="socialTextContainer">
            <span className="textContainer">Get the App</span>
          </div>
          <div className="soacialAppContainer">
            <img src={`${PF}person/google.png`} alt="" className="socialApp" />
            <img
              src={`${PF}person/microsoft.png`}
              alt=""
              className="socialApp1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
