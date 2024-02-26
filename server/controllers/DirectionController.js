import DirectionService from "../services/DirectionService.js"

class DirectionController {
  async create(req, res) {
    try {
      const newDirection = await DirectionService.create(req.body)
      return res.status(201).json(newDirection)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async getAll(req, res) {
    try {
      const directions = await DirectionService.getAll()
      return res.json(directions)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async getOne(req, res) {
    try {
      const direction = await DirectionService.getOne(req.params.id)
      return res.json(direction)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async update(req, res) {
    try {
      const updatedDirection = await DirectionService.update(req.body)
      return res.json(updatedDirection)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async delete(req, res) {
    try {
      const deletedDirection = await DirectionService.delete(req.params.id)
      return res.json(deletedDirection)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
}

export default new DirectionController()
