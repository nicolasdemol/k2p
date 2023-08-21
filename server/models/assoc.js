const mongoose = require("mongoose");

const assocSchema = new mongoose.Schema({
  aeb: { type: mongoose.Schema.Types.ObjectId, required: true },
  cms: { type: mongoose.Schema.Types.ObjectId, },
  pcb: { type: mongoose.Schema.Types.ObjectId, required: true },
  // Other fields for the association table if necessary
});

const Assoc = mongoose.model("Assoc", assocSchema);

module.exports = Assoc;