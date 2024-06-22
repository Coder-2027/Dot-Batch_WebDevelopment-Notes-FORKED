// Import Mongoose 
const mongoose = require('mongoose')


// Route Handler 
const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    } ,
    body : {
        type : String,
        required : true
    } ,
    likes : [{                                                    //an array of likes containing data of users those who have liked the post
                                                            //good practice to not to put actual data but put reference
        //here we will just send id of object who is liking our post
        type : mongoose.Schema.Types.ObjectId,
        ref : "Like",                            //reference to like model which will contain data of user who has liked our post
    }],
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment",
    }]
})


// Export 
module.exports = mongoose.model("Post",postSchema)
