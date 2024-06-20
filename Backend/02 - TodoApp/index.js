const express = require("express");                //good practice is that all importing statements should be written in starting
const app = express();

//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 3000;                  //either port number will come from .env file and if it doesnt come then we will use port 3000

//middleware to parse json request body
app.use(express.json());                          //another syntax for body parser

//import routes for TODO API
const todoRoutes = require("./routes/todos");

//mount the todo API routes
app.use("/api/v1", todoRoutes);              //now due to this in url we will have first localhost, then api/v1 and then we would have route contained in todoRoutes
//here v1 is used to define version like if we roll out another version v2 and want our previous client to smoothly use older version we use v1 and for newer rolled out version we use version v2
//would be applied to all the route defined in todoRoutes

//start server
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});

//connect to the database
const dbConnect = require("./config/database");
dbConnect();

//default Route
app.get("/", (req, res) => {
  res.send(`<h1> This is HOMEPAGE baby</h1>`);
});
