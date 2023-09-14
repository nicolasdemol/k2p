const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: String,
  title: String,
  status: String,
  priority: String,
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Référence au modèle User
    },
  ],
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
