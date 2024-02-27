import WarehouseService from "../services/WarehouseService.js"

class WarehouseController {
  async create(req, res) {
    try {
      const response = await WarehouseService.create(req.body)
      return res.json(response)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
  async getAll(req, res) {
    try {
      const warehouses = await WarehouseService.getAll()
      return res.json(warehouses)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
  async delete(req, res) {
    try {
      const deletedWarehouse = await WarehouseService.delete(req.params.id)
      return res.json(deletedWarehouse)
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async getCapacity(req, res) {
    try {
      const capacities = await WarehouseService.getCapacity()
      return res.json(capacities)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
  async autoFill(req, res) {
    try {
      
      const response = await WarehouseService.autoFill(req.body)
      return res.json(response)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
}
export default new WarehouseController()
