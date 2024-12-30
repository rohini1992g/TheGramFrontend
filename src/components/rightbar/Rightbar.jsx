import "./rightbar.css";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { useContext, useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "../../context/AuthContext";
import Online from "../online/online";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser, dispatch } = useContext(AuthContext);

  console.log(user + "user is");

  const [followingsfriends, setFollowingsFriends] = useState(
    user.followings.length
  );

  const [followersfriends, setFollowersFriends] = useState(
    user.followers.length
  );
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const HomeRightbar = (e) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + "person/gift.jpeg"} alt="" />
          <span className="birthdayText">
            <b>John Carter</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={PF + "person/fun.jpeg"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          <Online />
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>

            <span className="rightbarInfoValue">
              {user.city ? user.city : "Your City"}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">
              {user.from ? user.from : "Your From"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <h3 className="rightbarTitleh3">Followers:{" " + followersfriends}</h3>

        <h3 className="rightbarTitleh3">
          Followings:{" " + followingsfriends}
        </h3>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
