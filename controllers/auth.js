const { BadRequestError, UnauthenticatedError } = require("../errors")
const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError("please provide email and password!")
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials!")
  }

  const check = await user.checkPassword(password)
  if (!check) {
    throw new UnauthenticatedError("Incorrect password!")
  }
  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })

  res.send("login user")
}

module.exports = { register, login }
