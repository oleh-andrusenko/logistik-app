const { Schema, model, ObjectId } = require("mongoose")

const WindowsSet = new Schema({
  warehouse: { type: String },
  windows: { type: Array },
})

module.exports = model("WindowsSet", WindowsSet)
