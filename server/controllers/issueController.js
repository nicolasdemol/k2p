const Issue = require("../models/issue");

const issueController = {
  addIssue: async (req, res) => {
    try {
      const { userId, cardId, componentRef, quantity, description } = req.body;

      // Créer une nouvelle instance d'Issue
      const newIssue = new Issue({
        userId,
        cardId,
        componentRef,
        quantity,
        description,
      });

      // Sauvegarder la panne dans la base de données
      await newIssue.save();

      res.status(201).json({ message: "Panne enregistrée avec succès" });
    } catch (error) {
      console.error("Erreur lors de la création de la panne", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la création de la panne" });
    }
  },
  getIssueById: async (req, res) => {
    try {
      const cardId = req.params.cardId; // Récupérer l'ID de la carte depuis les paramètres de la requête

      // Chercher toutes les issues avec l'ID de la carte spécifiée et peupler les informations de l'utilisateur et de la carte associées
      const issues = await Issue.find({ cardId })
        .populate("userId")
        .exec();

      if (issues.length === 0) {
        return res
          .status(404)
          .json({ message: "Aucune issue trouvée pour cette carte" });
      }

      // Renvoyer les issues avec les informations complètes de l'utilisateur et de la carte associées
      res.status(200).json(issues);
    } catch (err) {
      console.error("Erreur lors de la récupération des issues", err);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des issues" });
    }
  },
  getAllIssues: async (req, res) => {
    try {
      const issues = await Issue.find({})
        .populate("userId") // Remplacez "userId" par le nom du champ contenant l'ID de l'utilisateur dans le modèle Issue
        .populate("cardId") // Remplacez "cardId" par le nom du champ contenant l'ID de la carte dans le modèle Issue
        .exec();

      // Renvoyer les issues avec les informations complètes des utilisateurs et des cartes associées
      res.status(200).json(issues);
    } catch (err) {
      console.error("Erreur lors de la récupération des issues", err);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des issues" });
    }
  },
};

module.exports = issueController;
