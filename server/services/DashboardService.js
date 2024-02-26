import Warehouse from "../models/Warehouse.js"
import Dealer from "../models/Dealer.js"
import User from "../models/User.js"
import Window from "../models/Window.js"
import Direction from "../models/Direction.js"
import Factory from "../models/Factory.js"

class DashboardService {
  async getCounts() {
    return {
      warehouses: await Warehouse.countDocuments(),
      dealers: await Dealer.countDocuments(),
      users: await User.countDocuments(),
      windows: await Window.countDocuments(),
      directions: await Direction.countDocuments(),
      factories: await Factory.countDocuments(),
    }
  }
  healthCheck() {
    return {
      code: 200,
      message: "OK",
    }
  }
}

export default new DashboardService()
