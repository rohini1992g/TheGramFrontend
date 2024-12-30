import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Messenger from "./pages/messenger/Messenger.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Register from "./pages/register/Register.jsx";
import { AuthContext } from "./context/AuthContext";
import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min.js";
import Create from "./components/create/Create.jsx";
import Search from "./pages/search/Search.jsx";
import ForgotPassword from "./pages/forgetPassword/ForgotPassword.jsx";
import ResetPassword from "./pages/resetPassword/ResetPassword.jsx";
import UpdateProfile from "./components/updateProfile/UpdateProfile.jsx";
function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Register />}
          </Route>

          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>

          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/messenger">
            <Messenger />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/forgotPassword">
            <ForgotPassword />
          </Route>
          <Route path="/resetPassword/:token">
            <ResetPassword />
          </Route>
          <Route path="/updateProfile">
            <UpdateProfile />
          </Route>
        </Switch>
      </Router>
    </BrowserRouter>
  );
}
export default App;
