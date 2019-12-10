const mongoose = require("mongoose");
const { Schema } = mongoose;

const SelectedCandidatesSchema = new Schema({
  vacancyId: Number,
  candidates: [
    {
      isSent: Boolean,
      emailAddress: String,
      fullName: String,
      phone: String,
      skillCount: Number
    }
  ]
});

module.exports = { SelectedCandidatesSchema };
