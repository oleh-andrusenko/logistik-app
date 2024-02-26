import Warehouse from "../models/Warehouse.js"
import Window from "../models/Window.js"

class WarehouseService {
  async putToCell(warehouse, window, pyramidNumber, cellNumber) {
    const newWindow = new Window({
      warehouse: warehouse,
      number: window.number,
      dealer: window.dealer,
      ready_date: window.readyDate,
      direction: window.direction,
      descripiton: window.description,
    })
    const windowResponse = await newWindow.save()
    //console.log(windowResponse)

    await Warehouse.updateOne(
      {
        warehouse: warehouse,
        "pyramids.number": pyramidNumber,
      },
      {
        $set: {
          "pyramids.$.cells.$[index]": {
            number: cellNumber,
            windowNumber: newWindow.number,
            windowId: String(newWindow._id),
          },
        },
      },
      {
        upsert: true,
        arrayFilters: [{ "index.number": cellNumber }],
      }
    )
    return { ...window, pyramid: pyramidNumber, cell: cellNumber }
  }
  async create(data) {
    console.log(data)
    const ifExist = await Warehouse.findOne({ warehouse: data.warehouse })
    if (!ifExist) {
      const emptyPyramids = []
      const emptyCells = []
      for (let j = 0; j < 36; j++) {
        emptyCells.push({ number: j + 1, windowNumber: null, windowId: "" })
      }
      for (let i = 0; i < data.count; i++) {
        emptyPyramids.push({
          number: i + 1,
          cells: emptyCells,
        })
      }
      const warehouse = new Warehouse({
        warehouse: data.warehouse,
        factory: data.factory,
        pyramids: emptyPyramids,
      })
      await warehouse.save()
      return {
        message: "Склад успішно створено",
        code: 201,
      }
    } else
      return {
        message: "Склад з таким іменем уже існує",
        code: 400,
      }
  }
  async getAll() {
    return await Warehouse.find()
  }
  async delete(id) {
    try {
      if (!id) throw new Error("ID is undefined")
      const deletedWarehouse = await Warehouse.deleteOne({ _id: id })
      return deletedWarehouse
    } catch (error) {
      console.error(error)
      res.status(500).json(error.message)
    }
  }
  async getCapacity() {
    const allWarehouses = await Warehouse.find()
    const capacities = []
    allWarehouses.map((warehouse) => {
      let counter = 0
      let total = warehouse.pyramids.length * 36
      warehouse.pyramids.map((pyramid) => {
        const nonNullable = pyramid.cells.filter(
          (cell) => cell.windowNumber === null
        )
        counter += nonNullable.length
      })
      capacities.push({ warehouse: warehouse.warehouse, total, free: counter })
    })
    return capacities
  }
  async autoFill({ windows, warehouse }) {
    let emptyCells = []
    let freeCells = []
    const findWarehouse = await Warehouse.findOne({
      warehouse: req.body.warehouse,
    })
    findWarehouse.pyramids.forEach((pyramid) => {
      freeCells = []
      pyramid.cells.forEach((cell) => {
        if (cell.windowNumber === null) {
          freeCells.push(cell.number)
        }
      })
      emptyCells.push({ pyramid: pyramid.number, freeCells })
    })
    console.log("Autofill started...")
    let resultArray = []
    for (let j = 0; j < windows.length; j++) {
      for (let i = 0; i < emptyCells.length; i++) {
        if (emptyCells[i].freeCells.length) {
          const tmpCell = emptyCells[i].freeCells.shift()
          resultArray.push(
            await putToCell(
              warehouse,
              windows[j],
              emptyCells[i].pyramid,
              tmpCell
            )
          )
          break
        }
      }
    }

    const newSet = new WindowsSet({
      warehouse: warehouse,
      windows: resultArray,
    })
    await newSet.save()
    return { code: 201, resultArray, id: String(newSet._id) }
  }
}
export default new WarehouseService()
