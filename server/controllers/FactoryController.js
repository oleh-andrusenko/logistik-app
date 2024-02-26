import FactoryService from "../services/FactoryService.js"

class FactoryController {
  async create(req, res) {
    try {
      const newFactory = await FactoryService.create(req.body)
      return res.status(201).json(newFactory)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async getAll(req, res) {
    try {
      const factorys = await FactoryService.getAll()
      return res.json(factorys)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async getOne(req, res) {
    try {
      const factory = await FactoryService.getOne(req.params.id)
      return res.json(factory)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async update(req, res) {
    try {
      const updatedFactory = await FactoryService.update(req.body)
      return res.json(updatedFactory)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async delete(req, res) {
    try {
      const deletedFactory = await FactoryService.delete(req.params.id)
      return res.json(deletedFactory)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
}

export default new FactoryController()
