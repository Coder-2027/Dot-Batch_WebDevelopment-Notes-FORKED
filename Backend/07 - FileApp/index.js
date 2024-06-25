
                //here we are gonna to create a an application where a user can upload images and videos, as well as when the data gets uploaded then the user 
// gets a mail, for storing media we are gonna to use cloudinary server which optimises the process of fetching...


//app create
const express = require("express");
const app = express();

//PORt find krna h 
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware add krne h 
app.use(express.json());
const fileUpload = require("express-fileupload");              //express js cannot interact with files so we need to install a third party middleware inorder 
// to interact with files 
app.use(fileUpload({                        //using this middleware we will be uploading files on server
                                                  //difference between fileupload and upload of cloudinary
  // cloudinary upload , it uploads the file on server then it uploads it on cloudinary then it deletes file from temp storage of server so indirectly it uploads 
  // the file on clodinary whereas fileupload uploads the file on server
    useTempFiles : true,                      //else it wasnt shpwing path of file in local serverwhen we printed file object extracted from req.files in controller
    tempFileDir : '/tmp/'
}));
//db se connect krnah 
const db = require("./config/database");
db.connect();

//cloud se connect krna h 
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount krna h 
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

//activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})
