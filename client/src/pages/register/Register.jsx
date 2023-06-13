import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"
import "./register.css"

export default function Register() {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(false);

  const handleSubmit = async (e) => {
    setError(false);
    try{
    e.preventDefault();
    const res = await axios.post("https://bruks-blog.onrender.com/api/auth/register", {
      username,
      email,
      password,
    });
    res.data && window.location.replace("/login");
  }catch(err){
    setError(true);
  }
  };

  return (
    <div className="register">
        <span className="registertitle">Register</span>
      <form action="" className="registerform" onSubmit={handleSubmit}>
        <label>Email</label>
        <input className="registerinput" type="text" placeholder=" Enter your email..."
        onChange={(e) => setEmail(e.target.value)}
        />
        <label>Username</label>
        <input className="registerinput" type="text" placeholder=" Enter your username..." 
        onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input className="registerinput" type="password" placeholder=" Enter your password..." 
        onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerbutton" type="submit">Register</button>
      </form>
        <button className="registerloginbutton">
        <Link className="link" to="/login">Login</Link>
        </button>
      {error && <span style={{color: "red", marginTop: "10px",justifyContent:"center"}}>Something went wrong !</span>}
    </div>
  );
}
