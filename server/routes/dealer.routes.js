const Router = require("express")
const router = new Router()
const Dealer = require("../models/Dealer")

//Додавання дилера
router.post("/add", async (req, res) => {
  try {
    const ifExist = await Dealer.findOne({ dealer: req.body.dealer })
    if (!ifExist) {
      const dealer = new Dealer({
        dealer: req.body.dealer,
      })
      await dealer.save()
      return res.json({
        message: "Dealer successfully created",
        code: 201,
      })
    } else
      return res.json({
        message: "Dealer already exist",
        code: 400,
      })
  } catch (error) {
    console.error(error)
  }
})

//All dealers
router.get("/all", async (req, res) => {
  try {
    const dealers = await Dealer.find()
    return res.json({
      dealers,
    })
  } catch (e) {
    console.error(e)
  }
})

//Видалення дилера
router.post("/remove", async (req, res) => {
  try {
    const resp = await Dealer.deleteOne({ _id: req.body.id })
    return res.json({ result: resp })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
