const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileupload -> handler function                                : it takes the file from client and stores it in some path of server

exports.localFileUpload = async (req, res) => {
    try {

        //fetch filefrom request
        const file = req.files.file;                               //using this file in ln 15
        console.log("FILE AAGYI JEE -> ", file);                        //from here we know we can find extension of our file from name ...


        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;                    //here date.now will always create a different name for the file
                // `.${file.name.split('.')[1]} -> used for defining file format (jpg, jpeg)
        //but before doing this create a folder named files inside controllers
        
        // In Node.js, __dirname is a special variable that provides the absolute path of the directory containing the currently 
        // executing script. It’s particularly useful for working with file paths, ensuring that your code can reliably locate files relative to the script’s
        // location, regardless of where the script is executed from.
        console.log("PATH-> ", path)

        //add path to the move fucntion
        file.mv(path, (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success: true,
            message: 'Local File Uploaded Successfully',
        });

    }
    catch (error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isFileTypeSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    if (quality) {
        options.quality = quality;                                //here quality parameter is for reducing image or video size
    }
    options.resource_type = "auto"                    //else video wasnt getting uploaded it is for automatically detecting the file type
    return await cloudinary.uploader.upload(file.tempFilePath, options);                    //using file.tempFilePath but before using this we need to include some 
    // flags in fileUpload of index.js, here tempFilePath indicates the local storage created on server from where it is being moved on to the folder created
    // in cloudinary whose name is codehelp
}

// image Uploader Handler 
exports.imageUpload = async (req, res) => {
    try {

        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // Fetch file 
        const imageFile = req.files.imageFile;
        console.log(imageFile);

        const supportedTypes = ["png", "jpg", "jpeg"];
        const fileType = imageFile.name.split('.')[1].toLowerCase();

        // Check file type is supported or not 
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // Upload to Cloudinary
        const response = await uploadFileToCloudinary(imageFile, "FileApp");
        console.log(response)                //from here we know that we have an entry of our file inside response.secure_url... this is a url for our entry in 
        // cloudinary


        // Upload to DB 
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.secure_url
        })


        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            file: fileData
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

// Video Uploader Handler 
exports.videoUpload = async (req, res) => {
    try {
        // Fetch Data 
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const videoFile = req.files.videoFile;

        // Validation 
        const supportedTypes = ["mp4", "mov"];
        const fileType = videoFile.name.split(".")[1].toLowerCase();

        // HW - File Maximum 5MB
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // Supported 
        // File Upload to the Cloudinary 
        const response = await uploadFileToCloudinary(videoFile, "FileApp");

        // Upload To DB
        const vidFile = new File({
            name,
            tags,
            email,
            fileUrl: response.secure_url
        })

        const file = await vidFile.save();

        res.status(200).json({
            success: true,
            message: "video file uploaded successfully",
            file: file
        })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

// image Reducer Handler 
exports.imageReducer = async (req, res) => {
    try {

        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // Fetch file 
        const imageFile = req.files.imageFile;
        console.log(imageFile);

        const supportedTypes = ["png", "jpg", "jpeg"];
        const fileType = imageFile.name.split('.')[1].toLowerCase();

        // Check file type is supported or not 
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // Upload to Cloudinary
        // HW - Decrease size by height and width 
        const response = await uploadFileToCloudinary(imageFile, "FileApp", 50);
        console.log(response)


        // Upload to DB 
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.secure_url
        })


        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            file: fileData
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


