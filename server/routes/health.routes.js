const Router = require("express")
const router = new Router()

router.get("/healthCheck", async (req, res) => {
  try {
    return res.json({
      code: 200,
      message: "OK",
    })
  } catch (e) {
    console.error(e)
  }
})

module.exports = router
