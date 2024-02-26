import Direction from "../models/Direction.js"

class DirectionService {
  async create(direction) {
    const newDirection = await Direction.create(direction)
    return newDirection
  }
  async getAll() {
    try {
      const directions = await Direction.find()
      return directions
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async getOne(id) {
    if (!id) throw new Error("ID is undefined")
    const direction = await Direction.findById(id)
    return direction
  }
  async update(direction) {
    try {
      if (!direction._id) throw new Error("ID is undefined")

      const updatedDirection = await Direction.findByIdAndUpdate(
        direction._id,
        direction,
        {
          new: true,
        }
      )
      return updatedDirection
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async delete(id) {
    try {
      if (!id) throw new Error("ID is undefined")
      const deletedDirection = await Direction.deleteOne({ _id: id })
      return deletedDirection
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
}
export default new DirectionService()
