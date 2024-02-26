import { model, Schema } from "mongoose"

const User = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  privilege_level: { type: Number, default: 1 },
})

export default model("User", User)
