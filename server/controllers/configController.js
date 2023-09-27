const Config = require("../models/config");

const configController = {
  getConfig: async (req, res) => {
    try {
      // Étape 1 : Récupérer la configuration actuelle
      const config = await Config.find(); // Suppose que vous avez un modèle de configuration

      if (!config) {
        // Si aucune configuration n'est trouvée, renvoyez une réponse appropriée
        return res.status(404).send("Aucune configuration trouvée");
      }

      // Étape 2 : Répondez avec la configuration actuelle
      res.status(200).json(config);
    } catch (err) {
      console.error(
        "Erreur lors de la récupération de la configuration :",
        err.message
      );
      res
        .status(500)
        .send("Erreur lors de la récupération de la configuration");
    }
  },
  updateConfig: async (req, res) => {
    try {
      // Étape 1 : Valider les données
      const { remotePath: newRemotePath, localPath: newLocalPath } = req.body;
      if (!newRemotePath && !newLocalPath) {
        // Si aucune donnée à mettre à jour n'est fournie, renvoyez une erreur de validation
        return res.status(400).send("Aucune donnée de mise à jour fournie");
      }

      // Étape 2 : Récupération de l'ancienne configuration
      let config = await Config.findOne(); // Suppose que vous avez un modèle de configuration

      // Étape 3 : Mise à jour de la configuration (partielle)
      if (!config) {
        // Si aucune configuration existante n'a été trouvée, créez-en une nouvelle
        config = new Config({});
      }

      if (newRemotePath) {
        config.remotePath = newRemotePath;
      }

      if (newLocalPath) {
        config.localPath = newLocalPath;
      }

      await config.save();

      // Étape 4 : Répondez avec un statut 200 en cas de succès
      res.status(200).send("Configuration mise à jour avec succès");
    } catch (err) {
      console.error(
        "Erreur lors de la mise à jour de la configuration :",
        err.message
      );
      res.status(500).send("Erreur lors de la mise à jour de la configuration");
    }
  },
};

module.exports = configController;
