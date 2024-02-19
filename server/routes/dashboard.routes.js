const Router = require("express")
const router = new Router()
const Warehouse = require("../models/Warehouse")
const Dealer = require("../models/Dealer")
const User = require("../models/User")
const Window = require("../models/Window")
const Direction = require("../models/Direction")
const Factory = require("../models/Factory")
router.get("/counts", async (req, res) => {
  return res.json({
    warehouses: await Warehouse.countDocuments(),
    dealers: await Dealer.countDocuments(),
    users: await User.countDocuments(),
    windows: await Window.countDocuments(),
    directions: await Direction.countDocuments(),
    factories: await Factory.countDocuments(),
  })
})

module.exports = router
