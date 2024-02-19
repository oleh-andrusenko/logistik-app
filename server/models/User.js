const { model, Schema } = require("mongoose");

const User = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  privilege_level: { type: Number, default: 1 },
});

module.exports = model("User", User);
