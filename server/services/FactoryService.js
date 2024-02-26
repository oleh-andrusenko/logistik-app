import Factory from "../models/Factory.js"

class FactoryService {
  async create(factory) {
    const newFactory = await Factory.create(factory)
    return newFactory
  }
  async getAll() {
    try {
      const factories = await Factory.find()
      return factories
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async getOne(id) {
    if (!id) throw new Error("ID is undefined")
    const factory = await Factory.findById(id)
    return factory
  }
  async update(factory) {
    try {
      if (!factory._id) throw new Error("ID is undefined")

      const updatedFactory = await Factory.findByIdAndUpdate(
        factory._id,
        factory,
        {
          new: true,
        }
      )
      return updatedFactory
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async delete(id) {
    try {
      if (!id) throw new Error("ID is undefined")
      const deletedFactory = await Factory.deleteOne({ _id: id })
      return deletedFactory
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
}
export default new FactoryService()
