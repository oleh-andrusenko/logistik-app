import DashboardService from "../services/DashboardService.js"

class DashboardController {
  async getCounts(req, res) {
    try {
      const counts = await DashboardService.getCounts()
      return res.json(counts)
    } catch (error) {
      console.log(error)
    }
  }
  async healthCheck(req, res) {
    try {
      const response = await DashboardService.healthCheck()
      return res.json(response)
    } catch (error) {
      console.error(error)
    }
  }
}

export default new DashboardController()
