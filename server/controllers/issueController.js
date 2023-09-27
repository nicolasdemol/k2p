const Issue = require("../models/issue");

const issueController = {
  addIssue: async (req, res) => {
    try {
      const { reportedBy, title, label, priority, status, description } =
        req.body;

      // Créer une nouvelle instance d'Issue
      const newIssue = new Issue({
        reportedBy,
        title,
        label,
        priority,
        status,
        description,
      });

      // Sauvegarder la panne dans la base de données
      await newIssue.save();

      res.status(200).json({ message: "Problème enregistrée avec succès" });
    } catch (error) {
      console.error("Erreur lors de la création de la panne", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la création de la panne" });
    }
  },
  deleteIssue: async (req, res) => {
    try {
      const { id } = req.params;
      await Issue.findByIdAndDelete({ _id: id });
      res.status(200).json({ message: "Problème supprimé avec succès." });
    } catch (error) {
      console.error("Erreur lors de la suppression du problème", error);
      res.status(500).json({
        message: "Erreur lors de la suppression du problème.",
        error: error.message,
      });
    }
  },
  getAllIssues: async (req, res) => {
    try {
      const issues = await Issue.find({})
        .populate("reportedBy") // Remplacez "userId" par le nom du champ contenant l'ID de l'utilisateur dans le modèle Issue
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
