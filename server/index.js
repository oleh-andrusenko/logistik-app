import express from "express"
import mongoose from "mongoose"
import config from "config"

import dealerRouter from "./routers/dealerRouter.js"
import directionRouter from "./routers/directionRouter.js"
import factoryRouter from "./routers/factoryRouter.js"
import dashboardRouter from "./routers/dashboardRouter.js"
import warehouseRouter from "./routers/warehouseRouter.js"
import userRouter from "./routers/userRouter.js"


import corsMiddleware from "./middleware/cors.middleware.js"
import logEvent from "./middleware/log.middleware.js"
const app = express()

const PORT = config.get("serverPort")

app.use(corsMiddleware)
app.use(express.json())
app.use(logEvent)

app.use("/user/", userRouter)
app.use("/dealer/", dealerRouter)
app.use("/direction/", directionRouter)

app.use("/warehouse/", warehouseRouter)
app.use("/factory/", factoryRouter)
app.use("/dashboard", dashboardRouter)

const start = async () => {
  try {
    await mongoose.connect(config.get("mongoURL"))
    app.listen(PORT, () => {
      console.clear()
      console.log(
        "\r\n  _                 _     _   _ _    \r\n | |               (_)   | | (_) |   \r\n | |     ___   __ _ _ ___| |_ _| | __\r\n | |    / _ \\ / _` | / __| __| | |/ /\r\n | |___| (_) | (_| | \\__ \\ |_| |   < \r\n |______\\___/ \\__, |_|___/\\__|_|_|\\_\\\r\n               __/ |                 \r\n  ___  ___ _ _|___/ _____ _ __       \r\n / __|/ _ \\ '__\\ \\ / / _ \\ '__|      \r\n \\__ \\  __/ |   \\ V /  __/ |         \r\n |___/\\___|_|    \\_/ \\___|_|         \r\n                                     \r\n                                     \r\n"
      )
      console.log(`version: 0.9260224b`)
      console.log(`Server started at localhost, port is ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}
start()
