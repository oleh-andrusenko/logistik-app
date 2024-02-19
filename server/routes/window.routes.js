const Router = require("express")
const router = new Router()
const Window = require("../models/Window")
const Warehouse = require("../models/Warehouse")
const ObjectId = require("mongodb").ObjectId

// router.post("/add", async (req, res) => {
//   try {
//     const data = req.body

//     const window = new Window({
//       number: data.number,
//       warehouse: data.whId,
//       pyramid: data.pId,
//       cell: data.cell,
//       dealer: data.dealer,
//       direction: data.direction,
//       ready_date: data.readyDate,
//       description: data.description,
//     })

//     const pyramid = await Pyramid.findOne({ _id: data.pId })
//     const tmpCells = pyramid.cells
//     console.log(tmpCells[data.cell])
//     if (tmpCells[data.cell].window === null) {
//       tmpCells[data.cell].window = data.number
//       await Pyramid.updateOne({ _id: data.pId }, { cells: tmpCells })
//       await window.save()
//       return res.json({
//         message: "Window successfully created",
//         code: 201,
//       })
//     } else
//       return res.json({
//         message: "Cell is not empty!",
//         codee: 400,
//       })
//   } catch (error) {
//     console.error(error)
//   }
// })
// //   router.get("/all", async (req, res) => {
// //     try {
// //       const warehouses = await Warehouse.find()
// //       return res.json({
// //         warehouses,
// //       })
// //     } catch (e) {
// //       console.error(e)
// //     }
// //   })

router.post("/remove", async (req, res) => {
  try {
    const resp = await Warehouse.deleteOne({ _id: req.body.id })
    return res.json({ result: resp })
  } catch (e) {
    console.log(e)
  }
})

router.post("/setter", async (req, res) => {
  console.log(req.body)
})

router.post("/set", async (req, res) => {
  try {
    console.table(req.body)
    const warehouse = await Warehouse.findOne({ warehouse: req.body.warehouse })
    if (warehouse) {
      if (
        warehouse.pyramids[Number(req.body.pyramid)-1].cells[
          Number(req.body.cell)
        ].windowNumber === null
      ) {
        const window = new Window({
          warehouse: req.body.warehouse,
          number: Number(req.body.number),
          dealer: req.body.dealer,
          direction: req.body.direction,
          description: req.body.description,
        })
        await window.save()
        const resp = await Warehouse.updateOne(
          {
            warehouse: req.body.warehouse,
            "pyramids.number": Number(req.body.pyramid),
          },
          {
            $set: {
              "pyramids.$.cells.$[index]": {
                number: Number(req.body.cell),
                windowNumber: Number(req.body.number),
                windowId: String(window._id),
              },
            },
          },
          {
            upsert: true,
            arrayFilters: [{ "index.number": Number(req.body.cell) }],
          }
        )

        const r = await Window.updateOne(
          { warehouse: req.body.warehouse, number: Number(req.body.number) },
          { pyramid: Number(req.body.pyramid), cell: Number(req.body.cell) }
        )
        return res.json({ code: 201, r })
      } else return res.json({ code: 400, message: "Комірка зайнята!" })
    } else res.json({ code: 404, message: "Склад не знайдено!" })
  } catch (error) {
    console.error(error)
    return res.json({ message: error })
  }
})
module.exports = router
