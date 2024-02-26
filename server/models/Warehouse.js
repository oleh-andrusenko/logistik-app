import { model, Schema, ObjectId } from "mongoose"

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

export default model("Warehouse", Warehouse)
