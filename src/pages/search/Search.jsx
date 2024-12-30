import React, { useContext, useEffect, useState } from "react";
import "./search.css";
import { Link } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";

import { AuthContext } from "../../context/AuthContext.js";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";

export default function Search() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [user, setUser] = useState("");
  const { user: currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/users/search-users?keyword=${query}`
      );

      console.log(res.data);
      setSearchResult(res.data);
    };

    if (query?.length) {
      fetchData();
    }
  }, [query]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/users?userId=${user._id}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [user._id]);

  return (
    <>
      <Topbar />

      <div className="search">
        <Sidebar />
        <div className="searchbarContainer">
          <div className="inputWrapper">
            <SearchIcon className="searchIcon" />
            <input
              type="text"
              placeholder="Search for friends........"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {(query?.length > 0 &&
            searchResult?.map((res) => (
              <div className="searchResult">{res?.username}</div>
            ))) ||
            ""}
        </div>
        <Rightbar />
      </div>
    </>
  );
}
