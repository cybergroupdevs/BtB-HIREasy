const { Schema } = require("mongoose");

exports.EmailSchema = new Schema({
  shortlistedCandidates:{
      vacancyId: Number,
      emailAddresses:[String]

  }
});
