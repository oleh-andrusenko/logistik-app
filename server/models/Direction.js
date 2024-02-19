const { model, Schema } = require("mongoose");

const Direction = new Schema({
  direction: { type: String, required: true, unique: true },
});

module.exports = model("Direction", Direction);
