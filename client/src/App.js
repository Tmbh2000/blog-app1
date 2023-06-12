import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Home from "./pages/home/Home";
import Write from "./pages/write/Write"; 
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Context } from "./context/Context";
import { useContext } from "react";
//import{BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";







function App() {
  const { user } = useContext(Context);

  const Layout = () =>{
    return (
      <div className="app">
      <TopBar/>
      <Outlet/>
      
      </div>
    )
  }
  
  const router = createBrowserRouter(
  
    [
  
    {
      
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/register",
          element:(user ? <Home/> : <Register />)
        },
        {
          path:"/login",
          element:(user ? <Home/> : <Login />)
        },
        {
          path:"/write",
          element:(user ? <Write/> : <Login />)
        },
        {
          path:"/settings",
          element:(user ? <Settings/> : <Login />)
        },
        {
          path:"/post/:postId",
          element:<Single />
        },
      ]
    },
  ])


 

  return (
    <>
    
   
   <div>
       <RouterProvider router={router} />
  </div>

  </>
   )
  



    
    
  
}

export default App;
