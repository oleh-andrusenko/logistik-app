import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
class UserService {
  async create(data) {
    const { username, password, level } = data
    const ifExists = await User.findOne({ username })
    if (ifExists) {
      return { message: "User already exists!", code: 400 }
    }
    const hashPassword = await bcrypt.hash(password, 8)
    const user = new User({
      username,
      password: hashPassword,
      privilege_level: Number(level),
    })
    await user.save()
    return { message: "User successfully created!", code: 201 }
  }
  async login(data) {
    const { username, password } = data
    const user = await User.findOne({ username })
    if (!user) {
      return { message: "User not found!", code: 404 }
    }
    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid) {
      return { message: "Invalid password!", code: 400 }
    }
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1h",
    })

    return {
      message: "Successfully logged in!",
      token,
      user: {
        id: user.id,
        username: user.username,
        privilege_level: user.privilege_level,
      },
    }
  }
  async auth(user) {
    const objId = new ObjectId(user.id)
    const authUser = await User.findOne({ _id: objId })
    const token = jwt.sign({ id: authUser.id }, config.get("secretKey"), {
      expiresIn: "1h",
    })

    return {
      message: "Successfully logged in!",
      token,
      user: {
        id: authUser.id,
        username: authUser.username,
        privilege_level: authUser.privilege_level,
      },
    }
  }
  async getAll() {
    return await User.find()
  }

  async delete(id) {
    try {
      if (!id) throw new Error("ID is undefined")
      const deletedUser = await User.deleteOne({ _id: id })
      return deletedUser
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
}
export default new UserService()
