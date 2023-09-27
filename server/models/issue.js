const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  label: { type: String, required: true },
  priority: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
