const { CustomAPIError } = require("../errors")
const { StatusCodes } = require("http-status-codes")
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  // return res.status(customeError.statusCode).json({ msg: customeError.msg })
}

module.exports = errorHandlerMiddleware
