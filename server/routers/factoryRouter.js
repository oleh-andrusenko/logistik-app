import FactoryController from "../controllers/FactoryController.js"
import Router from "express"

const factoryRouter = new Router()

factoryRouter.post("/", FactoryController.create)
factoryRouter.get("/", FactoryController.getAll)
factoryRouter.get("/:id", FactoryController.getOne)
factoryRouter.put("/", FactoryController.update)
factoryRouter.delete("/:id", FactoryController.delete)

export default factoryRouter
