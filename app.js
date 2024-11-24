require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const connectDB = require("./db/connect")
const jobRouter = require("./routes/jobs")
const authRouter = require("./routes/auth")
const auth = require("./middleware/authentication")
// error handler
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

app.use(express.json())
// extra packages

// routes
app.get("/", (req, res) => {
  res.send("jobs api")
})

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", auth, jobRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

connectDB()
app.listen(port, () => console.log(`Server is listening on port ${port}...`))
