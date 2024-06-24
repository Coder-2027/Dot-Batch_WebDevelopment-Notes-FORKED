const express =  require('express');
const app = express();
const cookieParser = require('cookie-parser');                    //just like inorder to parse the body of request we use body parser similarly to parse the body
// if cookie we use cookie-parser

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

require("./config/database").connect()                                //importing connect function from the mentioned path

// route import and mount 
const user = require("./routes/user");
app.use("/api/v1",user);

// Activate 
app.listen(PORT,() => {
    console.log("Server Run at ",PORT);
})

app.get("/", (req,res) => {
    res.send("<h1>Auth App</h1>")
})
