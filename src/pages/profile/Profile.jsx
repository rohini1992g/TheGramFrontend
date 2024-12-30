import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import AddIcon from "@mui/icons-material/Add";
import "./profile.css";
import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";

export default function Profile() {
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [token, setToken] = useState("");
  const username = useParams().username;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/users?username=${username}`,
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <img
              src={
                user.coverPicture
                  ? user.coverPicture
                  : PF + "person/bydefault.jpeg"
              }
              alt=""
              className="profileCoverImage"
            />
            <div className="updateImage">
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : PF + "person/noAvatar.jpeg"
                }
                alt=""
                className="profileUserImage"
              />

              <div className="createOptions">
                <label htmlFor="file" className="createOption">
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="profileInfo">
            <h4 className="profileNameInfo">{user.username}</h4>

            <span className="profileInfoDesc">
              {user.desc ? user.desc : "Hello there"}
            </span>
            <Link to="/updateProfile">
              <button className="editProfile">
                Edit
                <AddIcon className="add" />
              </button>
            </Link>
          </div>

          <div className="profileRightBottom">
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
