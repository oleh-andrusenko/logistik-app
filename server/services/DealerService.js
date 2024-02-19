import Dealer from "../models/Dealer.js"

class DealerService {
  async create(dealer) {
    const newDealer = await Dealer.create(dealer)
    return newDealer
  }
  async getAll() {
    try {
      const dealers = await Dealer.find()
      return dealers
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async getOne(id) {
    if (!id) throw new Error("ID is undefined")
    const dealer = await Dealer.findById(id)
    return dealer
  }
  async update(dealer) {
    try {
      if (!id) throw new Error("ID is undefined")

      const updatedDealer = await Dealer.findByIdAndUpdate(dealer._id, dealer, {
        new: true,
      })
      return updatedDealer
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async delete(id) {
    try {
      if (!id) throw new Error("ID is undefined")
      const deletedDealer = await Dealer.deleteOne({ _id: id })
      return deletedDealer
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
}
export default new DealerService()
