import { Schema, model, ObjectId } from "mongoose"

const WindowsSet = new Schema({
  warehouse: { type: String },
  windows: { type: Array },
})

export default model("WindowsSet", WindowsSet)
