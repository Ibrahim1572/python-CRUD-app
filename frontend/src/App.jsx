import HomePage from "./pages/home/page";
import Login from "./pages/login/page";
import Logout from "./pages/logout/page";
import Mediaposts from "./pages/mediaposts/page";
import Profile from "./pages/profile/page";
import Signup from "./pages/signup/page";

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
    {
      path:"/",
      element:<HomePage/>
    },
    {
      path:"login",
      element: <Login/>
    },
    {
      path:"logout",
      element:<Logout/>
    },
    {
      path:"mediaposts",
      element:<Mediaposts/>
    },
    {
      path:"profile",
      element:<Profile/>
    },
    {
      path:"signup",
      element:<Signup/>
    },
  ])
function App() {
  
  return (
    <RouterProvider router={router}> </RouterProvider>

  );
}

export default App;
