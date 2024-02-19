const { model, Schema } = require("mongoose");

const Factory = new Schema({
  factory: { type: String, required: true, unique: true },
});

module.exports = model("Factory", Factory);
