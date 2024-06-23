const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({                  //here schema is created 
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Student", "Visitor"],
  },
});

module.exports = mongoose.model("User", userSchema);                      //creation of a model which takes two things as a parameter 1.name 2.schema
