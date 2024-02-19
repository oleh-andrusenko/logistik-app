const { model, Schema } = require("mongoose");

const Dealer = new Schema({
  dealer: { type: String, required: true, unique: true },
});

module.exports = model("Dealer", Dealer);
