import React, { useState } from "react";
import "./resetPassword.css";
import axios from "axios";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { token } = useParams();
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(`http://localhost:8000/api/auth/resetPassword/${token}`, {
          password,
        })
        .then((res) => {
          if (res.data.status) {
            history.push("/login");
          }
          alert("password updated successfully. Go to login");
        });
    } catch (err) {
      alert("Invalid token");
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
              type="password"
              placeholder="Retype-Password"
              className="forgotInput"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="forgotButton" type="submit">
              Reset
            </button>
            <Link to="/register">
              <span className="backtoregister">Back to register</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
