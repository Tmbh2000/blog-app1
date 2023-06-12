import { Link } from "react-router-dom"
import { useContext, useRef, useState  } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import "./login.css"

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const {error} = useContext(Context);
  const [err,setErr] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try{
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    }catch(err){
      dispatch({ type: "LOGIN_FAILURE" });
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
        <span className="logintitle">Login</span>
      <form action="" className="loginform" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="logininput" type="text" placeholder=" Enter your username..."  ref={userRef} />
        <label>Password</label>
        <input className="logininput" type="password" placeholder=" Enter your password..." ref={passwordRef}/>
        <button className="loginbutton" type="submit" disabled={isFetching}>
          Login
          </button>
          {error && <span style={{color: "red", marginTop: "10px", display:"flex",justifyContent:"center"}}>Something went wrong !</span>}
          {err && err}
      </form>
        <button className="loginregisterbutton">
          <Link className="link" to="/register">Register</Link>
          </button>
    </div>
  )
}
