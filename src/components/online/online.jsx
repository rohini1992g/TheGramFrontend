import "./online.css";

export default function Online() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <ul className="rightbarFriendContainer">
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            className="rightbarProfileImg"
            src={`${PF}person/1-3.jpg`}
            alt=""
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">Pooja Sahare</span>
      </li>
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            className="rightbarProfileImg"
            src={`${PF}person/1-3.jpg`}
            alt=""
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">Anaya Das</span>
      </li>
    </ul>
  );
}
