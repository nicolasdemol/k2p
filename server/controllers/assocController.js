const Assoc = require("../models/assoc");
const Card = require("../models/card");
const cardController = require("./cardController");

const assocController = {
  addAssoc: async (req, res) => {
    try {
      const { aeb, cms, pcb } = req.body;

      // Vérifier si l'association existe déjà dans la base de données
      const existingAssoc = await Assoc.findOne({ aeb, cms, pcb });

      if (existingAssoc) {
        // Si l'association existe déjà, renvoyer une réponse avec un statut 409 (Conflit)
        return res.status(409).json({ message: "L'association existe déjà" });
      }

      // Créer une nouvelle association dans la base de données
      const newAssoc = await Assoc.create({ aeb, cms, pcb });

      res.json(newAssoc);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la création de l'association",
      });
    }
  },
  getAssocByRef: async (req, res) => {
    try {
      const { ref } = req.params;

      const cardId = await Card.findOne({ ref: ref });
      // Recherchez l'association qui contient l'ID de la carte donnée
      const assoc = await Assoc.findOne({
        $or: [{ aeb: cardId }, { cms: cardId }, { pcb: cardId }],
      });

      if (!assoc) {
        return res.status(404).json({ message: "Association non trouvée" });
      }

      const associatedCards = {};
      if (assoc.aeb) {
        const cardAeb = await cardController.getCardById(assoc.aeb);
        if (cardAeb) {
          associatedCards.aeb = cardAeb;
        }
      }
      if (assoc.cms) {
        const cardCms = await cardController.getCardById(assoc.cms);
        if (cardCms) {
          associatedCards.cms = cardCms;
        }
      }
      if (assoc.pcb) {
        const cardPcb = await cardController.getCardById(assoc.pcb);
        if (cardPcb) {
          associatedCards.pcb = cardPcb;
        }
      }

      // Renvoyer les informations des cartes associées
      res.json(associatedCards);
    } catch (error) {
      console.error("Error fetching associated cards:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getAllAssocs: async (req, res) => {
    try {
      // Récupérer toutes les associations de la base de données
      const assocs = await Assoc.find();

      // Tableau pour stocker les associations avec les références des cartes
      const assocsWithRefs = [];

      // Parcourir chaque association pour récupérer les références des cartes associées
      for (const assoc of assocs) {
        const aeb = await Card.findById(assoc.aeb).select("ref name");
        const cms = await Card.findById(assoc.cms).select("ref name");
        const pcb = await Card.findById(assoc.pcb).select("ref name");

        // Créer un objet avec les informations de l'association et les références des cartes associées
        const assocWithRefs = {
          _id: assoc._id,
          aeb: aeb,
          cms: cms,
          pcb: pcb,
        };

        // Ajouter l'objet au tableau
        assocsWithRefs.push(assocWithRefs);
      }

      res.json(assocsWithRefs);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la récupération des associations",
      });
    }
  },
  delAssoc: async (req, res) => {
    const { id } = req.params;

    try {
      // Vérifier si l'association existe avant de la supprimer
      const association = await Assoc.findById(id);
      if (!association) {
        return res.status(404).json({ message: "Association non trouvée" });
      }

      // Supprimer l'association de la base de données
      await Assoc.findByIdAndDelete(id);

      res.json({ message: "Association supprimée" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur durant la suppression" });
    }
  },
};

module.exports = assocController;
