const ObjectId = require("mongodb").ObjectId
const Router = require("express")
const config = require("config")

const User = require("../models/User")


const bcrypt = require("bcryptjs")
const router = new Router()
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middleware/auth.middleware")

//Реєстрація користувача
router.post("/add", async (req, res) => {
  try {
    console.log(req.body)
    const { username, password, level } = req.body
    const ifExists = await User.findOne({ username })
    if (ifExists) {
      return res.json({ message: "User already exists!", code: 400 })
    }
    const hashPassword = await bcrypt.hash(password, 8)
    const user = new User({
      username,
      password: hashPassword,
      privilege_level: Number(level),
    })
    await user.save()
    return res.json({ message: "User successfully created!", code: 201 })
  } catch (e) {
    console.log(e)
    res.send({ message: "Server error!", code: 400 })
  }
})
//Вхід
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(404).json({ message: "User not found!" })
    }
    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid password!" })
    }
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1h",
    })

    return res.json({
      message: "Successfully logged in!",
      token,
      user: {
        id: user.id,
        username: user.username,
        privilege_level: user.privilege_level,
      },
    })
  } catch (e) {
    console.log(e)
    res.send({ message: "Server error!" })
  }
})
//Авторизація по токену
router.get("/auth", authMiddleware, async (req, res) => {
  try {
    const objId = new ObjectId(req.user.id)
    const user = await User.findOne({ _id: objId })
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1h",
    })

    return res.json({
      message: "Successfully logged in!",
      token,
      user: {
        id: user.id,
        username: user.username,
        privilege_level: user.privilege_level,
      },
    })
  } catch (e) {
    console.error(e)
  }
})
//Список всіх користувачів
router.get("/all", async (req, res) => {
  try {
    const users = await User.find()
    return res.json({
      users,
    })
  } catch (e) {
    console.error(e)
  }
})
//Видалення користувача
router.post("/remove", async (req, res) => {
  try {
    const resp = await User.deleteOne({ _id: req.body.id })
    return res.json({ result: resp })
  } catch (e) {
    console.log(e)
  }
})






module.exports = router
