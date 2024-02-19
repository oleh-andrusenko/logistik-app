const { model, Schema, ObjectId } = require("mongoose")

const Warehouse = new Schema({
  warehouse: { type: String, required: true, unique: true },
  factory: { type: String, required: true },
  pyramids: [
    {
      number: Number,
      cells: [{ number: Number, windowNumber: Number, windowId: String }],
    },
  ],
})

module.exports = model("Warehouse", Warehouse)
