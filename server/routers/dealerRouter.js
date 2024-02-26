import DealerController from "../controllers/DealerController.js"
import Router from "express"

const dealerRouter = new Router()

dealerRouter.post("/", DealerController.create)
dealerRouter.get("/", DealerController.getAll)
dealerRouter.get("/:id", DealerController.getOne)
dealerRouter.put("/", DealerController.update)
dealerRouter.delete("/:id", DealerController.delete)

export default dealerRouter
