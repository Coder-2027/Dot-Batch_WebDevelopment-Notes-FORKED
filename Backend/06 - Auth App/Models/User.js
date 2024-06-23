const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({                  //here schema is created 
  name: {
    type: String,
    require: true,
    trim: true,
    // In the context of a Mongoose schema, the trim: true option is used to automatically remove any leading and trailing whitespace
    // from the string before it is saved to the database. This ensures that the stored value does not have any unnecessary spaces at the beginning or end.
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
    enum: ["Admin", "Student", "Visitor"],                    //this means that we are defining range of values that this parameter can take
  },
});

module.exports = mongoose.model("User", userSchema);                      //creation of a model which takes two things as a parameter 1.name 2.schema
