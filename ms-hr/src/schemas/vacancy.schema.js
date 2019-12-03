const mongoose = require("mongoose");
const { Schema } = mongoose;
const autoIncrement = require('mongoose-sequence')(mongoose);

const VacancySchema = new Schema({
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
  },
  // auto-increment field
  vacancyID: { 
    type: Number
  },
  isProcessed: {
    type: Boolean,
    default: false
  },
});

VacancySchema.plugin(autoIncrement, {
  inc_field: 'vacancyID',  
  start_seq: 101
});

module.exports = { VacancySchema };