const Router = require("express")
const router = new Router()
const Warehouse = require("../models/Warehouse")
const Window = require("../models/Window")

const WindowsSet = require("../models/WindowsSet")
//Додавання складу
router.post("/add", async (req, res) => {
  try {
    const data = req.body.warehouse
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
      return res.json({
        message: "Склад успішно створено",
        code: 201,
      })
    } else
      return res.json({
        message: "Склад з таким іменем вже існує",
        code: 400,
      })
  } catch (error) {
    console.error(error)
  }
})
//All warehouses
router.get("/all", async (req, res) => {
  try {
    const warehouses = await Warehouse.find()
    return res.json({
      warehouses,
    })
  } catch (e) {
    console.error(e)
  }
})

router.post("/remove", async (req, res) => {
  try {
    const resp = await Warehouse.deleteOne({ _id: req.body.id })
    return res.json({ result: resp })
  } catch (e) {
    console.log(e)
  }
})

router.post("/random", async (req, res) => {
  try {
    const params = await Warehouse.findOne({ warehouse: req.body.warehouse })
    const pyramidsLength = params.pyramids.length
    console.log("Warehouse: ", req.body.warehouse)
    for (let i = 0; i < pyramidsLength; i++) {
      console.log("\x1b[0m", `Filling [Pyramid ${i + 1}]:`)
      for (let j = 0; j < 36; j++) {
        const randomWindow = Math.floor(Math.random() * (9999 - 1 + 1) + 1)
        const resp = await Warehouse.updateOne(
          { warehouse: req.body.warehouse, "pyramids.number": i + 1 },
          {
            $set: {
              "pyramids.$.cells.$[index]": {
                number: j + 1,
                windowNumber: randomWindow,
                windowId: String(randomWindow),
              },
            },
          },
          {
            arrayFilters: [{ "index.number": j + 1 }],
          }
        )
      }

      console.log("\x1b[32m", "=[FILLED]=")
    }
    return res.json({ message: "Action ended!" })
  } catch (error) {
    console.log(error)
  }
})

router.post("/clear", async (req, res) => {
  try {
    const params = await Warehouse.findOne({ warehouse: req.body.warehouse })
    const pyramidsLength = params.pyramids.length

    for (let i = 0; i < pyramidsLength; i++) {
      console.log("Warehouse: ", req.body.warehouse)
      console.log("\x1b[0m", `Cleaning [Pyramid ${i + 1}]:`)
      for (let j = 0; j < 36; j++) {
        const resp = await Warehouse.updateOne(
          { warehouse: req.body.warehouse, "pyramids.number": i + 1 },
          {
            $set: {
              "pyramids.$.cells.$[index]": {
                number: j + 1,
                windowNumber: null,
                windowId: "",
              },
            },
          },
          {
            upsert: true,
            arrayFilters: [{ "index.number": j + 1 }],
          }
        )
        process.stdout.write("#")
      }
      console.log("\x1b[32m", "=[CLEARED]=")
    }
    return res.json({ message: "Action ended!" })
  } catch (error) {
    console.log(error)
  }
})

router.get("/capacity", async (req, res) => {
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
  return res.json(capacities)
})

async function putToCell(warehouse, window, pyramidNumber, cellNumber) {
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

router.post("/autofill", async (req, res) => {
  try {
    const { windows, warehouse } = req.body
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
    console.table(resultArray)
    console.log("Autofill ended...")
    const newSet = new WindowsSet({
      warehouse: warehouse,
      windows: resultArray,
    })
    await newSet.save()
    return res.json({ code: 201, resultArray, id: String(newSet._id) })
  } catch (error) {
    console.error(error)
    return res.json({ message: error })
  }
})

router.post("/windowsset", async (req, res) => {
  try {
    const set = await WindowsSet.findById(req.body.id)
    console.log(set)
    return res.json({
      set,
    })
  } catch (error) {
    alert(error)
  }
})
module.exports = router
