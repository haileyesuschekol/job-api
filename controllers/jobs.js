const getAllJobs = async (req, res) => {
  res.send("Get jobs")
}

const getJob = async (req, res) => {
  res.send("Get single job")
}

const createJob = async (req, res) => {
  res.send("create job")
}
const updateJob = async (req, res) => {
  res.send("update job")
}

const deleteJob = async (req, res) => {
  res.send("delete job")
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }
