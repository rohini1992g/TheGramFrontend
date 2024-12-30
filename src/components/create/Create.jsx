import React, { useContext, useRef, useState } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import RoomIcon from "@mui/icons-material/Room";
import CancelIcon from "@mui/icons-material/Cancel";

import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import "./create.css";

import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Rightbar from "../rightbar/Rightbar";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Create() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  console.log(user);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.image = fileName;
      console.log(newPost);
      try {
        await axios.post("http://localhost:8000/api/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("http://localhost:8000/api/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <>
      <Topbar />
      <div className="create">
        <Sidebar className="sidebarincreate" />
        <div className="createWrapper">
          <div className="createTop">
            {/* <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.jpeg"
              }
              alt="the image"
              className="topbarImg"
            /> */}
            <input
              type="text"
              placeholder={"What's your mind " + user.username + "?"}
              className="createInput"
              ref={desc}
            />
          </div>
          <hr className="createHr" />

          {file && (
            <div className="createImgContainer">
              <img
                className="createImg"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <CancelIcon
                className="createCancelImg"
                onClick={() => setFile(null)}
              />
            </div>
          )}
          <form className="createBottom" onSubmit={submitHandler}>
            <div className="createOptions">
              <label htmlFor="file" className="createOption">
                <PermMediaIcon className="createIcon" />
                <span className="createOptionText">Photo</span>

                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <div className="createOption">
                <LabelImportantIcon className="createIcon" />
                <span className="createOptionText">Tag</span>
              </div>
              <div className="createOption">
                <RoomIcon className="createIcon" />
                <span className="createOptionText">Location</span>
              </div>
              <div className="createOption">
                <EmojiEmotionsIcon className="createIcon" />
                <span className="createOptionText">Feelings</span>
              </div>
            </div>
            <button className="createButton" type="submit">
              Share
            </button>
          </form>
        </div>
        <Rightbar />
      </div>
    </>
  );
}
