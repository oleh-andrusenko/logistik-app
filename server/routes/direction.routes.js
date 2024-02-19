const Router = require("express")
const router = new Router()

const Direction = require("../models/Direction")

//Додавання напрямку
router.post("/add", async (req, res) => {
  try {
    const ifExist = await Direction.findOne({ direction: req.body.direction })
    if (!ifExist) {
      const direction = new Direction({
        direction: req.body.direction,
      })
      await direction.save()
      return res.json({
        message: "Direction successfully created",
        code: 201,
      })
    } else
      return res.json({
        message: "Direction already exist",
        code: 400,
      })
  } catch (error) {
    console.error(error)
  }
})

//All directions
router.get("/all", async (req, res) => {
  try {
    const directions = await Direction.find()
    return res.json({
      directions,
    })
  } catch (e) {
    console.error(e)
  }
})

//Видалення дилера
router.post("/remove", async (req, res) => {
  try {
    const resp = await Direction.deleteOne({ _id: req.body.id })
    return res.json({ result: resp })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
