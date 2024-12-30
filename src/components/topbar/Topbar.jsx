import "./topbar.css";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);

  const history = useHistory();
  const logoutHandler = async () => {
    try {
      await axios.get("http://localhost:8000/api/auth/logout").then((res) => {
        if (res.data.status) {
          history.push("/login");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="topbarLogo">The Gram</span>
        </Link>
      </div>

      <div className="profileNameAndImage">
        <div className="profileNameTextAndBio">
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : PF + "person/noAvatar.jpeg"
            }
            alt="the image"
            className="topbarImg"
          />
          <div className="profileTextAndBio">
            <span
              className="profileNameText"
              style={{ textDecoration: "none", color: "black" }}
            ></span>
            <span>{user.username}</span>

            {user.Bio}
          </div>
        </div>
      </div>

      <div className="topbarRight">
        <div className="logoutButton" onClick={logoutHandler}>
          <label className="logoutButtonText">Logout</label>
          <LogoutIcon className="logoutbutton" />
        </div>
      </div>
    </div>
  );
}
