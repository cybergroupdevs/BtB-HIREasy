const { Schema } = require("mongoose");

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  role: {
    type: String,
    default: "employee"
  }
});

module.exports = { UserSchema };
