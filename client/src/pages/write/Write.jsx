import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import "./write.css"

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if(file){
      const data = new FormData();
      const filename= Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try{
        await axios.post("http://localhost:5000/api/upload", data);
        console.log("correct")
      }catch(err){

      }
    }
    try{
   const res = await axios.post("http://localhost:5000/api/posts", newPost);
   window.location.replace("/post/" + res.data._id);
    }catch(err){

    }
  }
  return (
    <div  className="write">
      {file &&(
        <img className="writeimg" src={URL.createObjectURL(file)}
        alt="" />)}
       <form className="writeform" onSubmit={handleSubmit}>
        <div className="writeformgroup">
            <label htmlFor="fileInput">
            <i className="writeicon fa-solid fa-plus "></i>
            </label>
            <input 
            type="file" 
            id="fileInput" 
            style={{display: "none"}} 
            onChange={e=>setFile(e.target.files[0])}
            />
            <input 
            type="text" 
            placeholder="Title" 
            className="writeinput" 
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
            />
        </div>
        <div className="writeformgroup">
            <textarea 
            placeholder="Tell your story..." 
            type="text" 
            className="writeinput writetext"
            onChange={e=>setDesc(e.target.value)}
            ></textarea>
        </div>
        <button className="writesubmit" type="submit">Publish</button>
       </form>
    </div>
  )
}
//src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 