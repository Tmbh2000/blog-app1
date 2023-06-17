const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

const corsOptions ={
  origin:'https://648d5dca2348aa5917ce62d7--stellar-banoffee-2b3224.netlify.app', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify:true,
   // useCreateIndex: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

  app.use("/api/users", userRoute);
 app.use("/api/auth", authRoute);
 app.use("/api/posts", postRoute);
 app.use("/api/categories", categoryRoute);

 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
      
    },
    filename: (req, file, cb) => {
      console.log(file)
      cb(null,  req.body.name);
    },
  });

 const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.listen(5000,() => {
    console.log("Backend is running on port 5000.");
});

//process.env.MONGO_URL

//file.originalname

//'http://localhost:3000'
