const Job = require("../models/Job")
const { BadRequestError, NotFoundError } = require("../errors")
const { StatusCodes } = require("http-status-codes")
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("-createdAt")
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: jobId },
    } = req

    const job = await Job.find({ _id: jobId, createdBy: userId })
    if (!job) {
      throw new NotFoundError("Job not found!")
    }
    res.status(StatusCodes.OK).json({ job })
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ msg: "Invalid request!" })
    }
  }
}

const createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}
const updateJob = async (req, res) => {
  try {
    const {
      body: { company, position },
      user: { userId },
      params: { id: jobId },
    } = req

    if (!company || !position) {
      throw new BadRequestError("Please Provide Valid Input!")
    }

    const job = await Job.findByIdAndUpdate(
      { _id: jobId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    )

    if (!job) {
      throw new NotFoundError("Job not found!")
    }
    res.status(StatusCodes.OK).json({ job })
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ msg: "Invalid request!" })
    } else {
      res.status(400).json({ msg: error.message })
    }
  }
}

const deleteJob = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: jobId },
    } = req

    const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId })
    if (!job) {
      throw new NotFoundError("Job not found!")
    }

    res.status(StatusCodes.OK).json({ msg: "Job Deleted Successfully!" })
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ msg: "Invalid request!" })
    } else {
      res.status(400).json({ msg: error.message })
    }
  }
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }
