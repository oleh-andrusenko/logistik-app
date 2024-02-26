import DirectionController from "../controllers/DirectionController.js"
import Router from "express"

const directionRouter = new Router()

directionRouter.post("/", DirectionController.create)
directionRouter.get("/", DirectionController.getAll)
directionRouter.get("/:id", DirectionController.getOne)
directionRouter.put("/", DirectionController.update)
directionRouter.delete("/:id", DirectionController.delete)

export default directionRouter
