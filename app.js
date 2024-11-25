require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const connectDB = require("./db/connect")
const jobRouter = require("./routes/jobs")
const authRouter = require("./routes/auth")
const auth = require("./middleware/authentication")

//security packages
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

// error handler
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

// extra packages
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(rateLimiter)

// routes
app.get("/", (req, res) => {
  res.send("jobs api")
})

//routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", auth, jobRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

connectDB()
app.listen(port, () => console.log(`Server is listening on port ${port}...`))
