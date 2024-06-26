const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
});

require("dotenv").config();

//post method is applied on schema, it is always essential to add this post method before making of model
// post middleware is used when we want to perform an action just after creating an entry in database similiarly pre middleware is used just before creating entry in
// database

fileSchema.post("save", async function (doc) {                        //here doc refers to the document saved on database            -> sending mail when saved
    try {
        console.log("DOC : ", doc)

        // transporter
        const transporter = nodemailer.createTransport({                        //nodemailer is used for sending mails
            host: process.env.MAIL_HOST,                        //here as a host we will be using server of google mail
            auth: {
                user: process.env.MAIL_USER,                    //username and password via which we would be sending mails
                pass: process.env.MAIL_PASS                        //generate this passkey from manage googlle account > search > app password > generate it from there
            },
        })

        // send mail 
        const info = await transporter.sendMail({                        //used for sending mails
            from: 'From Priyansh',
            to: doc.email,                            //to the email id supplied in doc
            subject: "New File Uploaded to Cloudinary",
            html: `<h2>File Uploaded</h2> <br> view now - <a href="${doc.fileUrl}">CLick Here</a>`                //mail body
        })

        console.log("Info : ", info)
    }
    catch (err) {
        console.log(err);
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;
