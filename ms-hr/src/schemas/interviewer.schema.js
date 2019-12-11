const { Schema } = require("mongoose");

exports.InterviewerSchema = new Schema({
  name: String,
  email: String,
  designation: String,
  years_of_experience: Number,
  skills: [String],
  department: String
});
