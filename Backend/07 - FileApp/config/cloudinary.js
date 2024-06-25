const cloudinary = require("cloudinary").v2;

require("dotenv").config();
exports.cloudinaryConnect = () => {                                            //using this to connect with cloudinary server
    try{
            cloudinary.config({
                cloud_name:process.env.CLOUD_NAME,                            //open cloudinary > setting > product_info
                api_key: process.env.API_KEY,                                                    //open cloudinary > setting > api_keys
                api_secret: process.env.API_SECRET,                                //open cloudinary > setting > api_keys
            })
    }
    catch(error) {
        console.log(error);
    }
}
