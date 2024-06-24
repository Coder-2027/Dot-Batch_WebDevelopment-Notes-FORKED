const bcrypt = require('bcrypt');                                        //used to encrypt our data depending on some algo
const User = require("../Models/User");
const jwt = require("jsonwebtoken")

require("dotenv").config()

// Sign up route handler
exports.signup = async (req, res) => {
    try {
        // get data
        const { name, email, password, role } = req.body;

        // check if user already exist 
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists",
            })
        }

        // Secured password 
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);                        //here second parameter of hash is used to tell how many times we need to run 
            // our function for encrypting
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            })
        }

        // Create Entry for User
        let user = await User.create({
            name,email,password:hashedPassword,role
        });

        return res.status(200).json({
            success : true,
            message : "User Created Successfully",
            data : user
        });
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "User cannot be register,Please try again later",
        })
    }
}

// Login
exports.login = async (req,res) => {
    try
    {
        const {email,password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message : "Please fill all the details carefully",
            })
        }

        // check for register user 
        let user = await User.findOne({email});                                    //it will return an object containing email and password
        if(!user)
        {
            return res.status(401).json({
                success : false,
                message : "User does not exist",
            });
        }

        // Verify password & generate a JWT token

        const payload = {
            email : user.email,
            id : user._id,
            role : user.role,
        };


        if(await bcrypt.compare(password,user.password)){                    //first we will becrypt the password contained in password and then compare it with 
            // user.password                                used an await because here we would be hashing our passord first
            // password match
            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn : "2h",                //this is an option, which tells when this jwt token will expire
            });

            user = user.toObject();                            //explicitly converted it to object else it was not creating a new key named token inside it BUT WHY??
            user.token = token;                        
            user.password = undefined;                    //doing this becuase we will be sending this object in response

            const options = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000                        //in ms),
                httpOnly : true,                    //makes client side cookie read only
            }

            // res.cookie("token",token,options).status(200).json({
            //     success : true,
            //     token,
            //     user,
            //     message:"User logged in successfully"
            // });

            res.status(200).json({
                success : true,
                token,
                user,
                message:"User loged in successfully"
            });
        }
        else {
            // password not match
            return res.status(403).json({
                success : false,
                message : "Password does not match",
            })
        }
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "Login false" 
        })
    }
}
