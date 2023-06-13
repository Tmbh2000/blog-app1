import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import "./topbar.css"

export default function TopBar() {
    const { user, dispatch } = useContext(Context);
   const PF = "https://bruks-blog.onrender.com/images/"

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
      };
  return (
    <div className="top">
        <div className="topleft">
           <i className="topicon fa-brands fa-square-facebook" ></i>
           <Link to="https://twitter.com/bruk_tamrat"><i className="topicon fa-brands fa-square-twitter"></i></Link>
            <i className="topicon fa-brands fa-square-pinterest"></i>
            <Link to="https://www.instagram.com/bruk_tamrat"><i className="topicon fa-brands fa-square-instagram"></i></Link>
        </div>
        <div className="topcenter">
            <ul className="toplist">
                <li className="toplistitem">
                    <Link className="link" to="/" >HOME</Link>
                </li>
                <li className="toplistitem"><Link className="link" to="/" >ABOUT</Link></li>
                <li className="toplistitem"><Link className="link" to="/" >CONTACT</Link></li>
                <li className="toplistitem"><Link className="link" to="/write" >WRITE</Link></li>
                <li className="toplistitem" onClick={handleLogout}>
                    {user && "LOGOUT"}
                </li>
            </ul>
        </div>
        <div className="topright">
            {
                user ? (
                <Link to="/settings">
                    <img className="topimg"
                         src={PF+user.profilePic}
                         alt="" 
                         />
                 </Link>
                     ) : (
                    <ul className="toplist">
                        <li className="toplistitem">
                            <Link className="link" to="/login" >LOGIN</Link>
                        </li>
                        <li className="toplistitem">
                            <Link className="link" to="/register" >REGISTER</Link>
                        </li>
                </ul>
                )
            }
            
            <i className="topsearchicon fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
  );
}

//"https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
