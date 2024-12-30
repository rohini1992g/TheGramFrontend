import "./sidebar.css";
import React, { useContext, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import CreateIcon from "@mui/icons-material/Create";
import Person2Icon from "@mui/icons-material/Person2";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

import ListRoundedIcon from "@mui/icons-material/ListRounded";

import { AuthContext } from "../../context/AuthContext";
export default function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarLists">
          <Link to="/">
            <li className="sidebarListItem">
              <HomeIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Home </span>
            </li>
          </Link>

          <Link to="/search">
            <li className="sidebarListItem">
              <SearchIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Search </span>
            </li>
          </Link>

          <li className="sidebarListItem">
            <SlideshowIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Reels </span>
          </li>
          <Link to="/messenger">
            <li className="sidebarListItem">
              <MessageIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Message </span>
            </li>
          </Link>

          <Link to="/create">
            <li className="sidebarListItem">
              <CreateIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Create </span>
            </li>
          </Link>
          <Link
            to={`/profile/${user.username}`}
            style={{ textDecoration: "none" }}
          >
            <li className="sidebarListItem">
              <Person2Icon className="sidebarIcon" />
              <span className="sidebarListItemText">Profile </span>
            </li>
          </Link>

          <li className="sidebarListItem">
            <ListRoundedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">More </span>
          </li>
        </ul>
        <Divider orientation="vertical" flexItem />
      </div>
    </div>
  );
}
