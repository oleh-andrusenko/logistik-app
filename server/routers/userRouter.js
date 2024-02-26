import Router from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import UserController from "../controllers/UserController.js"

const userRouter = new Router()

userRouter.post("/", UserController.create)
userRouter.get("/", UserController.getAll)
userRouter.delete("/:id", UserController.delete)
userRouter.post('/login', UserController.login)
userRouter.post('/auth', authMiddleware, UserController.auth)

export default userRouter
