const Card = require("../models/card");

const cardController = {
  addCard: async (req, res) => {
    try {
      // Récupérez les données de la nouvelle carte à partir du corps de la requête
      const { ref, name, type, description } = req.body;

      // Vérifiez si le ref existe déjà dans la base de données
      const existingCard = await Card.findOne({ ref });
      if (existingCard) {
        return res.status(409).json({ message: "La carte existe déjà" });
      }

      // Créez une nouvelle instance du modèle "Card" avec les données fournies
      const newCard = new Card({
        ref,
        name,
        type,
        description,
        // Autres champs de la carte si nécessaire
      });

      // Enregistrez la nouvelle carte dans la base de données
      await newCard.save();

      res.status(200).json({ message: "Carte insérée avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
  removeCard: async (req, res) => {
    const { id } = req.params;

    try {
      // Utilisez la méthode findByIdAndDelete pour supprimer la carte par ID
      const deletedCard = await Card.findByIdAndDelete(id);

      if (!deletedCard) {
        return res.status(404).json({ message: "Carte non trouvée" });
      }

      res.json({ message: "Carte supprimée avec succès", deletedCard });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur serveur lors de la suppression de la carte" });
    }
  },

  addManyCards: async (req, res) => {
    try {
      // Récupérer les données de toutes les cartes depuis le corps de la requête
      const cardsData = req.body;

      // Insérer toutes les cartes en une seule opération
      await Card.insertMany(cardsData);

      res.status(201).json({ message: "Cartes insérées avec succès" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  getAllCards: async (req, res) => {
    try {
      // Requête pour récupérer toutes les cartes
      const cards = await Card.find();
      res.json(cards);
    } catch (error) {
      console.error("Error fetching cards:", error);
      res.status(500).json({ error: "Server error" });
    }
  },

  // Fonction pour récupérer les informations d'une carte à partir de son ID
  getCardById: async (cardId) => {
    try {
      const card = await Card.findById(cardId);
      return card;
    } catch (error) {
      console.error("Error fetching card by ID:", error);
      return null;
    }
  },

  getCardsByRef: async (req, res) => {
    const { ref } = req.params;
    try {
      // Requête pour trouver toutes les cartes dont le numéro de référence commence par la chaîne saisie
      const card = await Card.findOne({
        ref: ref,
      });
      res.json(card);
    } catch (error) {
      console.error("Error fetching cards:", error);
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = cardController;
