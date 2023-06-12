//import axios from "axios";
//import { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import "./sidebar.css"


export default function Posts() {
  /*const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("http://localhost:5000/api/categories/");
      setCats(res.data);
    };
   getCats();
  }, []);
*/
  return (
    <>
    
    <div className="sidebar">
        <div className="sidebaritem">
        
            <span className="sidebartitle">ABOUT ME</span>
            
            <img src= "https://i.pinimg.com/236x/1e/3f/58/1e3f587572a7a7b20bbf1828595a1786--holiday-party-themes-holiday-gift-guide.jpg"
            alt="" />
           
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Ipsam ducimus possimus fuga beatae, qui facilis. Itaque, illum cumque! dignissimos?</p>
            
        </div>
        <div className="sidebaritem">
        <span className="sidebartitle">CATEGORIES</span>
        <ul className="sidebarlist">
          <li>music</li>
       {/* {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
       ))}*/}
        </ul>
        </div>
        <div className="sidebaritem">
        <span className="sidebartitle">FOLLOW US</span>
        <div className="sidebarsocial">
            <i className="sidebaricon fa-brands fa-square-facebook"></i>
            <i className="sidebaricon fa-brands fa-square-twitter"></i>
            <i className="sidebaricon fa-brands fa-square-pinterest"></i>
            <i className="sidebaricon fa-brands fa-square-instagram"></i>
        </div>
        </div>
    </div>
    </>
  );
}
