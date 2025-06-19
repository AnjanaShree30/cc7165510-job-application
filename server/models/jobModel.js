const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: String,
  salary: String,
  description: String,
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
