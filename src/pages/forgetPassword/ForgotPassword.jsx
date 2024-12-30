import React, { useState } from "react";
import "./forgotPassword.css";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function ForgotPassword() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/api/auth/forgotPassword", {
          email,
        })
        .then((res) => {
          if (res.data.status) {
            alert("check your email for reset password link");
            history.push("/login");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="forgotPassword">
      <div className="forgotWrapper">
        <div className="forgotLeft">
          <h3 className="forgotLogo">The Gram</h3>
        </div>
        <div className="forgotRight">
          <form className="forgotBox" onSubmit={handleClick}>
            <input
              type="email"
              placeholder="Email"
              className="forgotInput"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button className="forgotButton" type="submit">
              Send
            </button>
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
