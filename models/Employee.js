const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  email: {
    type: String,
    unique: true,
    required: true 
  },
  mobile: {
    type: String,
    required: true 
  },
  designation: {
    type: String,
    required: true 
  },
  gender: {
    type: String,
    required: true 
  },
  courses: [String], 
  imgFile: String, 
  createdDate: {
    type: Date,
    default: Date.now 
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
