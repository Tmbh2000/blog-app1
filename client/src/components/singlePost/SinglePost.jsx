import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import "./singlepost.css"

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]) ;
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const PF = "http://localhost:5000/images/";

  useEffect(()=>{
       const getPost = async ()=>{
        const res = await axios.get("http://localhost:5000/api/posts/"+path);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
       };
       getPost();
  },[path]);

  const handleDelete = async()=>{
    try{
    await axios.delete(`http://localhost:5000/api/posts/${post._id}`, { 
      data: { username: user.username},
    });
    window.location.replace("/");
  }catch(err){
    console.log(err);
  }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      window.location.reload();
      setUpdateMode(false);
    } catch (err) {}
  };

  
  return (
    <div className="singlepost">
      <div className="singlepostwrapper">
      {post.photo && (
        <img src={PF+post.photo}
        alt="" className="singlepostimg" />
        ) }
        {
          updateMode ? ( 
          <input 
          type="text" 
          value={title} 
          className="singleposttitleinput"
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          /> 
          ): (
        <h1 className="singleposttitle">
            {title}
            {post.username === user?.username && (
            <div className="singlepostedit">
            <i className="singleposticon fa-regular fa-pen-to-square" 
            onClick={() => setUpdateMode(true)}
            ></i>
            <i className="singleposticon fa-regular fa-trash-can" 
            onClick={handleDelete}
            ></i>
            </div>
             )}
        </h1>
           )
          }
          <div className="singlepostinfo">
            <span className="singlepostauthor">Author: 
           <Link to={`/?user=${post.username}`} className="link"> 
           <b>{post.username}</b> 
           </Link>
            </span>
            <span className="singlepostdate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            {updateMode ? (
            <textarea 
            className="singlepostdescinput" 
            value={desc} 
            onChange={(e) => setDesc(e.target.value)}
            />
            ) : (
            <p className="singlepostdesc">{desc}</p>
            ) }
            { updateMode &&
            <button className="singlepostbutton" onClick={handleUpdate}>
              Update
              </button>
               }
            </div>
    </div>
  )
}
