import DealerService from "../services/DealerService.js"

class DealerController {
  async create(req, res) {
    try {
      const newDealer = await DealerService.create(req.body)
      return res.status(201).json(newDealer)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async getAll(req, res) {
    try {
      const dealers = await DealerService.getAll()
      return res.json(dealers)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async getOne(req, res) {
    try {
      const dealer = await DealerService.getOne(req.params.id)
      return res.json(dealer)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async update(req, res) {
    try {
      const updatedDealer = await DealerService.update(req.body)
      return res.json(updatedDealer)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async delete(req, res) {
    try {
      const deletedDealer = await DealerService.delete(req.params.id)
      return res.json(deletedDealer)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
}

export default new DealerController()
