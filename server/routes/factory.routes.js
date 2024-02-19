const Router = require("express")
const router = new Router()
const Factory = require("../models/Factory")


//Додавання цеху
router.post("/add", async (req, res) => {
    try {
      const ifExist = await Factory.findOne({ factory: req.body.factory })
      if (!ifExist) {
        const factory = new Factory({
          factory: req.body.factory,
        })
        await factory.save()
        return res.json({
          message: "Factory successfully created",
          code: 201,
        })
      } else
        return res.json({
          message: "Factory already exist",
          code: 400,
        })
    } catch (error) {
      console.error(error)
    }
  })
//All factories
router.get("/all", async (req, res) => {
  try {
    const factories = await Factory.find()
    return res.json({
      factories,
    })
  } catch (e) {
    console.error(e)
  }
})
//Видалення цеху
router.post("/remove", async (req, res) => {
  try {
    const resp = await Factory.deleteOne({ _id: req.body.id })
    return res.json({ result: resp })
  } catch (e) {
    console.log(e)
  }
})


module.exports = router