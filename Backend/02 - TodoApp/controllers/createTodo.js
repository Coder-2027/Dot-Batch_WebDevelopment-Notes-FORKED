//import th model
const Todo = require("../models/Todo");

//define route handler

exports.createTodo = async(req,res) => {                        //making a network call is always done inside async function , here we are making a call to database in ln 11
    try {
            //extract title and desxcription from reauest body
            const {title,description} = req.body;
            //create a new Todo Obj and insert in DB
            const response = await Todo.create({title,description});                    //here create function is used for creating and inserting data in our database
            //send a json response with a success flag
            res.status(200).json(
                {
                    success:true,
                    data:response,
                    message:'Entry Created Successfully'
                }
            );
    }
    catch(err) {
        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:err.message,
        })
    }
}
