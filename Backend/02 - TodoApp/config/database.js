const mongoose = require("mongoose");                                     //require function is for importing

require("dotenv").config();                        //dotenv -> library , due to this everything inside env file gets loaded in process object

const dbConnect = () => {                                            //this function does connection between our application and database
    mongoose.connect(process.env.DATABASE_URL, {                        //before writting this we need to put env inside process object which is being done in ln 3
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB ka Connection is Successful"))
    .catch( (error) => {
        console.log("Issue in DB Connection");
        console.error(error.message);                                    //*****
// console.error() is a console method in JavaScript that is used to log error messages to the console. It works like console.log() but is specifically designed for logging errors. When console.error() is called, it prints an error message to the console along with a red error icon.

        
        //iska matlab kya h ?
        process.exit(1);                                            //*****
        //The process.exit(1) statement in Node.js is used to forcefully terminate the running Node.js process with an exit code
//         process.exit(0): Used to exit the process successfully.
// process.exit(1): Used to exit the process with an error or failure., where 0 and 1 are exit codes
    } );
}

module.exports = dbConnect;                                    //syntax for exporting
