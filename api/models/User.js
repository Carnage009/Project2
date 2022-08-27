const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  userBirthDay: { type: String, required: true },
  avatar: { type: String },
  password: { type: String, required: true },
});

module.exports = model("users", UserSchema);
