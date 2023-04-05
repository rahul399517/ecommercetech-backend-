/*
                      Thought Note 

   This route defines two routes, one for uploading a file and another for downloading a file.

   The multer package is used for handling file uploads. 
   
   It provides disk storage engine for storing uploaded files.
   
   
   The destination property of the diskStorage configuration specifies the destination directory
   where uploaded files should be stored.
   
   The filename property of the diskStorage configuration specifies the name of the uploaded file.

  The upload middleware is used to handle the file upload functionality. 
  
  
  It uses the storage configuration to define where the uploaded file should be stored on the server. 
  
  
  The fileFilter configuration checks if the uploaded file has a valid mime type before storing it on the server.

  The /uploadfile route is used for handling file uploads. 
  
  It uses the upload middleware to handle the file upload. 
  
  The uploaded file is available in the req.file object.
  
  
  The filename of the uploaded file is returned in the response.

 The /files/:filename route is used for handling file downloads.

It takes the filename of the file to download as a parameter in the URL. 

The res.download() function is used to download the file from the server.

If an error occurs while downloading the file, a 500 status code is returned 
with an error message.


*/
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { route } = require("./user_route");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); //../upload is the file destination of the image we upload
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,

  fileFilter: (res, file, cb) => {
    if (
      file.mimetype === "video/mp4" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return res
        .status(400)
        .json({ error: "Please upload gif,jpg, png, jpeg filetype only" });
    }
  },
});
//upload image file functionality
router.post("/uploadfile", upload.single("file"), function (req, res) {
  res.status(201).json({ fileName: req.file.filename });
});
//download functionality
const downloadFile = (req, res) => {
  const fileName = req.params.filename;
  const path = __basedir + "/uploads/";

  res.download(path + fileName, (error) => {
    if (error) {
      res.status(500).send({ message: "File cannot be downloaded" + error });
    }
  });
};
router.get("/files/:filename", downloadFile);
module.exports = router;
