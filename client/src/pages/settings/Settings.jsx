import { useContext, useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import axios from "axios";
import { Context } from "../../context/Context"
import "./settings.css"

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success ,setSuccess] = useState(false);
  const [error,setError] = useState(false);

  const { user, dispatch } = useContext(Context);

  const PF = "https://bruks-blog.onrender.com/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if(file){
      const data = new FormData();
      const filename= Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try{
        await axios.post("https://bruks-blog.onrender.com/api/upload", data);
      }catch(err){}
    }
    try{
     const res = await axios.put("https://bruks-blog.onrender.com/api/users/"+user._id, updatedUser);
     setSuccess(true);
    dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
     //console.log("success");
     console.log(success)
    }catch(err){
     dispatch({ type: "UPDATE_FAILURE" });
     setError(true);
      console.log(error)
    }
  };

  return (
    <div className="settings">
      <div className="settingswrapper">
        <div className="settingstitle">
          <span className="settingsupdatetitle">Update Your Account</span>
          <span className="settingsdeletetitle">Delete Account</span>
        </div>
        <form  className="settingsform" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file) : PF+user.profilePic}
            alt="" 
            />
            <label htmlFor="fileInput">
              <i className="settingsPPicon fa-regular fa-circle-user"></i>
            </label>
            <input 
            type="file" 
            id="fileInput" 
            style={{display:"none"}}
            onChange={e=>setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input 
          type="text" 
          placeholder={user.username} 
          onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input 
          type="email" 
          placeholder={user.email} 
          onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input type="password"
          placeholder="Change password"
          onChange={(e) => setPassword(e.target.value)} 
          />
          <button className="settingssubmit" type="submit">
            Update
            </button>
            {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
          {error && <span style={{color: "red", marginTop: "10px",justifyContent:"center"}}>Something went wrong !</span>}
        </form>
      </div>
      <Sidebar/>
    </div>
  )
}

//"https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"  
