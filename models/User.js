const mongoose = require("mongoose")
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name!"],
    minLenght: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "please provide email!"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide email!",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provid password!"],
    minlength: [6, "please provide atleaset 6 character!"],
  },
})

userSchema.pre("save", async function () {
  const salt = await bycrypt.genSalt(10)
  this.password = await bycrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
}

userSchema.methods.checkPassword = async function (credentialPassword) {
  const isMatch = await bycrypt.compare(credentialPassword, this.password)
  return isMatch
}

module.exports = mongoose.model("User", userSchema)
