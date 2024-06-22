// Import Mongoose 
const mongoose = require('mongoose')


// Route Handler 
const commentSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,                            //id of post, konsi post par like kar rahe ho
        ref : "Post" //reference to the post model
    },
    user: {
        type:String,
        required:true,
    },    
    body: {
        type:String,
        required:true,
    }    
})


// Export 
module.exports = mongoose.model("Comment",commentSchema)
