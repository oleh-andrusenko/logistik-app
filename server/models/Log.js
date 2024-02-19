const { model, Schema } = require("mongoose")

const Log = new Schema({
  timestamp: { type: Date, required: true },
  type: { type: String, required: true },
  log_level: {type: Number, required: true},
  message: {type: String, require: true}
})

module.exports = model("Log", Log)
