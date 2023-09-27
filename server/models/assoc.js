const mongoose = require("mongoose");

const assocSchema = new mongoose.Schema({
  aeb: {
    type: Number,
    required: true,
  },
  cms: { type: Number },
  pcb: { type: Number, required: true },
});

const Assoc = mongoose.model("Assoc", assocSchema);

module.exports = Assoc;
