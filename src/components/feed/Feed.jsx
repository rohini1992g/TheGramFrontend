import "./feed.css";
import React, { useState, useEffect, useContext } from "react";
import Post from "../post/Post.jsx";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.js";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("http://localhost:8000/api/posts/profile/" + username)
        : await axios.get(
            "http://localhost:8000/api/posts/timeline/" + user._id
          );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
