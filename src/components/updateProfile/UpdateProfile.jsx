import "./updateProfile.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Rightbar from "../rightbar/Rightbar";
import CancelIcon from "@mui/icons-material/Cancel";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function UpdateProfile() {
  const [file, setFile] = useState(null);

  const [data, setData] = useState({
    Bio: "",
    city: "",
    from: "",
  });
  const { user } = useContext(AuthContext);
  console.log(JSON.stringify(user) + "user here");
  const handleInput = (e) => {
    const updateName = e.target.updateName;
    const value = e.target.value;

    setData({
      ...data,
      [updateName]: value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/update/${user._id}`,
        {
          newBio: data.Bio,
          newCity: data.city,
          newFrom: data.from,
        }
      );
    } catch (err) {}
  };

  return (
    <>
      <Topbar />
      <div className="updateProfile">
        <Sidebar />
        <div className="createWrapper">
          <div className="headLine">Update User Information</div>
          <hr className="hrline" />

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
          <form className="updateBottom" onSubmit={submitHandler}>
            <div className="createOptions1">
              <div className="changeContent">
                <label>Change Profile Picture :</label>
              </div>
              <label htmlFor="file" className="createOption">
                <AddAPhotoIcon className="photoIcon" />
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <div className="updatebarContainer1">
                <label>Description:</label>
                <input
                  type="text"
                  placeholder="Enter Description ..."
                  className="inputtext"
                  onChange={handleInput}
                  value={data.Bio}
                />
              </div>
              <div className="updatebarContainer2">
                <label>City:</label>
                <input
                  type="text"
                  className="inputtext"
                  placeholder="Enter City Here ..."
                  value={data.city}
                  onChange={handleInput}
                />
              </div>
              <div className="updatebarContainer">
                <label>From:</label>
                <input
                  type="text"
                  className="inputtext"
                  placeholder="You Are From ..."
                  value={data.from}
                  onChange={handleInput}
                />
              </div>
              <button className="createButton123" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
        <Rightbar />
      </div>
    </>
  );
}
