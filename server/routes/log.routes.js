const Router = require("express")
const Log = require("../models/Log")
const router = new Router()

//Запис події
router.post("/add", async (req, res) => {
  try {
    const log = new Log({
      timestamp: Date.now(),
      type: req.body.type,
      log_level: req.body.log_level,
      message: req.body.message,
    })
    await log.save()
    return res.json({ message: "Logged!" })
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
})
//Всі події
router.get("/all", async (req, res) => {
  try {
    const logs = await Log.find()
    return res.json({
      logs,
    })
  } catch (e) {
    console.error(e)
  }
})

module.exports = router
