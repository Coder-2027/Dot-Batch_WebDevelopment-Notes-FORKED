const jwt = require("jsonwebtoken")
require("dotenv").config();
//middleware are functions which are invoked by intercepting the request call, that is when the call is going to towards server then in middle there occurs a 
// middleware for example if a student is trying to peek in the details which is only accesible to admin then in that case middleware occurs and does authorization
//so it intercepts in middle


exports.auth = (req, res, next) => {                        //next is for calling next middleware
    try {

        // console.log("Body", req.body.token);
        // console.log("Cookies", req.cookies.token);
        // console.log("Header", req.header("Authorization").replace("Bearer", " "));

        // const token = req.body.token;
        // const token = req.cookie.token 
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");                //we have 3 ways for taking out token
                                                    //here sending data via header is more secured comparitively
         // req.cookies.token  -> would fail if cookie parser wasnt added

        // req.header("Authorization").replace("Bearer ", ""); -> we need to follow exact syntax after Bearer we need to put a space
        // here Authorization is a key and Bearer is a value
        // "Authorization : Bearer <token>"                while writing above syntax we find value for authorization which gives Bearer <token> now on replacing 
        // it by an empty string we are left with <token> , one more point to be noted this key value pair is present in header
        
        if(!token || token === undefined) {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }
        // verify the token 
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // The jwt.verify function is used to verify the authenticity of a JSON Web Token (JWT). 
            // It decodes the token and validates its signature using a secret key or a public key. Here’s a brief overview of how it works:

                // Token Verification: It checks if the token is valid by verifying its signature against the provided secret key or public key.
                // Decoding: If the token is valid, it decodes the payload, which contains the claims (like user information, expiration time, etc.).
                // Error Handling: If the token is invalid or expired, it returns an error.

            console.log(decode)                                //contains payload ( data )
    
            req.user = decode;                                //pushing it in request because it will be used in authorization
        }
        catch (e) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }

        next();
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying token"
        })
    }
}

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protect route for students you can not access it"
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role is not Matching"
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protect route for Admins,you can not access it"
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role is not Matching"
        })
    }
}

//cookie hijacking and token hijacking
// cookie is stored in client side , whereas session is stored in server side both store info about user
