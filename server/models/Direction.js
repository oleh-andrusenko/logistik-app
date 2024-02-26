import { model, Schema } from "mongoose"

const Direction = new Schema({
  direction: { type: String, required: true, unique: true },
})

export default model("Direction", Direction)
