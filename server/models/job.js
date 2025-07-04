// server/models/Job.js

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  salary: String,
  description: String,
  email:String,
});

module.exports = mongoose.models("Job", jobSchema);
