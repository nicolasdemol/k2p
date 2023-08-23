const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({
  metricType: String, // Par exemple, "CA" ou "productivity"
  amount: Number,
  period: Date,
  unit: String,
});

const Metric = mongoose.model("Metric", metricSchema);

module.exports = Metric;
