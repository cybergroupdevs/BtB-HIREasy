const { Schema } = require("mongoose");

exports.CandidateSchema = new Schema({
  name: String,
  email: String,
  contact: String,
  experience: Number,
  skills: [String],
  education: String,
  skillCount: Number
});
