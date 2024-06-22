// import model 
const Post = require("../models/postModel");                                                        //here we are creating 3 controllers because we want to interact with 3 of them
const Comment = require("../models/commentModel");
const { response } = require("express");

// business Logic
exports.createComment = async (req, res) => {
    try {
        // fetch data from request body 
        const { post, user, body } = req.body;

        // create comment object
        const comment = new Comment({                                    //made a new object of comment, inorder to insert an entry in database we first need to make an object of our object...
            post, user, body
        })

        // save the new comment object into the db 
        const savedComment = await comment.save();                                    //another way of creating an entry in db

        // Find the Post By Id and the new comment to its comment array 
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } },            //here push is an update operator, similarly we have pull operator which is used to delete an entry
// $push: { comments: savedComment._id } -> here comments is a parameter inside post, and post which is another parameter here is an id via which post will be searched in database , this post is fetched from body in ln 10
                                                         
            { new: true })                            //this parameter means after updating comment return the new document, else it will return older document
            .populate("comments") //Populates the comment array with the comments document
            //ln 25 refers to a query where we are saying it return a document where comments array is populated or filled with actual comment data because we want it to get displayed in response as stated in ln 30
            .exec();                //for executing this query ???

        res.json({
            post: updatedPost,                        //if ln 25 wasnt present then we would have received a post where comments would have only ids and not the actual comment data
        })
    }
    catch (err) {
        return res.status(500).json({
            error : "Error while creating comment",            
        })
    }
}
