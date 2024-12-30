import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import "./home.css";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/auth/verify",
          user._id
        );
        if (res.data.status) {
          console.log("verified user");
        } else {
          history.push("/login");
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        history.push("/login");
      }
    };

    if (user) {
      console.log("Hiiii" + user);
      fetchdata();
    }
  }, [user, history]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
