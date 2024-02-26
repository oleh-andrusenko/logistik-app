import WarehouseController from "../controllers/WarehouseController.js"
import Router from "express"

const warehouseRouter = new Router()

warehouseRouter.post("/", WarehouseController.create)
warehouseRouter.get("/", WarehouseController.getAll)
warehouseRouter.delete("/:id", WarehouseController.delete)
warehouseRouter.get('/capacity', WarehouseController.getCapacity)
warehouseRouter.post('/autofill', WarehouseController.autoFill)

export default warehouseRouter
