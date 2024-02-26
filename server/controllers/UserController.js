import UserService from "../services/UserService.js"

class UserController {
  async create(req, res) {
    try {
      const createdUser = await UserService.create(req.body)
      return res.json(createdUser)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
  async delete(req, res) {
    try {
      const deletedUser = await UserService.delete(req.params.id)
      return res.json(deletedUser)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async login(req, res) {
    try {
      const loginResponse = await UserService.login(req.body)
      return res.json(loginResponse)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
  async auth(req, res) {
    try {
      const authResponse = await UserService.login(req.user)
      return res.json(authResponse)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
  async getAll(req, res) {
    try {
      const users = await UserService.getAll()
      return res.json(users)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
}
export default new UserController()
