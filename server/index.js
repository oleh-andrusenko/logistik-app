const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const userRouter = require("./routes/user.routes")
const dealerRouter = require("./routes/dealer.routes")
const directionRouter = require("./routes/direction.routes")
const warehouseRouter = require("./routes/warehouse.routes")
const windowRouter = require("./routes/window.routes")
const logRouter = require("./routes/log.routes")
const factoryRouter = require("./routes/factory.routes")
const healthRouter = require("./routes/health.routes")
const dashboardRouter = require("./routes/dashboard.routes")
const corsMiddleware = require("./middleware/cors.middleware")
const app = express()
const PORT = config.get("serverPort")

app.use(corsMiddleware)
app.use(express.json())
app.use("/user/", userRouter)
app.use("/dealer/", dealerRouter)
app.use("/direction/", directionRouter)
app.use("/warehouse/", warehouseRouter)
app.use("/window/", windowRouter)
app.use("/log/", logRouter)
app.use("/factory/", factoryRouter)
app.use("/health", healthRouter)
app.use("/dashboard", dashboardRouter)
const start = async () => {
  try {
    await mongoose.connect(config.get("mongoURL"))
    app.listen(PORT, () => {
      console.clear()
      console.log(
        "\r\n  _                 _     _   _ _    \r\n | |               (_)   | | (_) |   \r\n | |     ___   __ _ _ ___| |_ _| | __\r\n | |    / _ \\ / _` | / __| __| | |/ /\r\n | |___| (_) | (_| | \\__ \\ |_| |   < \r\n |______\\___/ \\__, |_|___/\\__|_|_|\\_\\\r\n               __/ |                 \r\n  ___  ___ _ _|___/ _____ _ __       \r\n / __|/ _ \\ '__\\ \\ / / _ \\ '__|      \r\n \\__ \\  __/ |   \\ V /  __/ |         \r\n |___/\\___|_|    \\_/ \\___|_|         \r\n                                     \r\n                                     \r\n"
      )
      console.log(`version: 0.7b`)
      console.log(`Server started at localhost, port is ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}
start()
