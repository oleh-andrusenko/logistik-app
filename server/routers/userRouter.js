import Router from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import UserController from "../controllers/UserController.js"

const userRouter = new Router()

userRouter.post("/register", UserController.create)
userRouter.get("/", UserController.getAll)
userRouter.delete("/:id", UserController.delete)
userRouter.post('/login', UserController.login)
userRouter.get('/auth', authMiddleware, UserController.auth)

export default userRouter
