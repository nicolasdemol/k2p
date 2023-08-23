const mongoose = require("mongoose");

// Définir la structure du document "cards"
const cardSchema = new mongoose.Schema({
  ref: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: { type: String }, // Description de la carte
  type: { type: String, required: true, enum: ["PCB", "CMS", "AEB"] },
  createdAt: { type: Date, default: Date.now }, // Date de création du problème
});

// Créer le modèle "Card" à partir du schéma défini
const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
