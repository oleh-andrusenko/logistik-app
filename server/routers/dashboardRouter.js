import DashboardController from "../controllers/DashboardController.js"
import Router from "express"

const dashboardRouter = new Router()


dashboardRouter.get("/counts", DashboardController.getCounts)
dashboardRouter.get("/health", DashboardController.healthCheck)


export default dashboardRouter
