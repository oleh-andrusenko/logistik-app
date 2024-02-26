import { model, Schema } from "mongoose"

const Factory = new Schema({
  factory: { type: String, required: true, unique: true },
})

export default model("Factory", Factory)
