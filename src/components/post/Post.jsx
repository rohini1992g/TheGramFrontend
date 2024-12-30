import React, { useEffect, useRef, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./post.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import SendIcon from "@mui/icons-material/Send";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const comment = useRef();
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("http://localhost:8000/api/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const commentPost = {
      userId: user._id,
      comment: comment.current.value,
    };
    try {
      await axios.post("http://localhost:8000/api/posts", commentPost);
    } catch (err) {}
  };
  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user.username}`}>
                <img
                  className="postProfileImage"
                  src={
                    user.profilePicture
                      ? user.profilePicture
                      : PF + "person/noAvatar.jpeg"
                  }
                  alt=""
                />
              </Link>
              <span className="postUserName">{user.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              <MoreVertIcon />
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img
              className="postImg"
              src={process.env.REACT_APP_PUBLIC_FOLDER + post?.image}
              alt="photoes"
            />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src={`${PF}person/like.png`}
                onClick={likeHandler}
                alt=""
              />
              <img
                className="likeIcon"
                src={`${PF}person/image.png`}
                onClick={likeHandler}
                alt=""
              />
              <span className="postLikeCounter">{like} People liked it.</span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">comment </span>
            </div>
          </div>

          <div className="userComment">{post?.comment}</div>
          {user.username !== currentUser.username && (
            <div className="inputAndSendButton">
              <input
                type="text"
                className="inputCommentText"
                placeholder="Comment Here....."
                ref={comment}
              />
              <SendIcon className="sendIcon" onClick={submitHandler} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
