import mongoose from "mongoose"

const Dealer = new mongoose.Schema({
  dealer: { type: String, required: true, unique: true },
})

export default mongoose.model("Dealer", Dealer)
