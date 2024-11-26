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
app.set("trust proxy", 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15min
    max: 100, //limit each ip to 100 request per windows
  })
)

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

// Route to serve the HTML file
app.get("/", (req, res) => {
  res.send("JOB-API")
})
// routes
// app.get("/", (req, res) => {
//   res.status(200)
// })

//routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", auth, jobRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

connectDB()
app.listen(port, () => console.log(`Server is listening on port ${port}...`))
