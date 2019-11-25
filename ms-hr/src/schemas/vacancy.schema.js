const { Schema } = require("mongoose");

exports.VacancySchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
    lowercase: true
  },
  jobDescription: {
    type: String,
    lowercase: true
  },
  jobPosition: String,
  jobLocation: {
    type: [String],
    required: true
  },
  qualifications: [String],
  certifications: [String],
  canFresherApply: {
    type: Boolean,
    default: false,
    required: true
  },
  minRequiredExperience: {
    type: Number,
    required: true
  },
  maxRequiredExperience: Number,
  skills: {
    type: [String],
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  },
  creationUser: {
    type: String
  }
});
