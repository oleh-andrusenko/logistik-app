import { Schema, model, ObjectId } from "mongoose"

const Window = new Schema({
  number: { type: Number, required: true },
  warehouse: { type: String, required: true, default: "" },
  pyramid: { type: Number, default: null },
  cell: { type: Number, default: null },
  dealer: { type: String, required: true },
  direction: { type: String, required: true },
  ready_date: { type: String, required: true },
  in_date: { type: Date, default: Date.now() },
  out_date: { type: Date, default: null },
  description: { type: String },
})

export default model("Window", Window)
