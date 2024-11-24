const mongoose = require("mongoose")
const { applyTimestamps } = require("./User")

const jobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide a company name!"],
      maxLenght: 100,
    },
    position: {
      type: String,
      required: [true, "please provide a position!"],
      maxLenght: 100,
    },
    status: {
      type: String,
      enum: ["interview", "pending", "declined"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide a creator"],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Job", jobSchema)
