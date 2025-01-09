import Home from "./components/Home";
import Login from "./components/login";
import MainLayout from "./components/MainLayout";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Search from "./components/Search.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChatPage } from "./components/ChatPage";
import ResetPassword from "./components/ResetPassword";

const browerserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={browerserRouter} />
    </>
  );
}

export default App;
