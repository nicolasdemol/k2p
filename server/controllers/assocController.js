const Assoc = require("../models/assoc");

const assocController = {
  getAllAssocs: async (req, res) => {
    try {
      // Récupérer toutes les associations de la base de données
      const assocs = await Assoc.find();

      res.json(assocs);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la récupération des associations",
      });
    }
  },
  updateAssocs: async (req, res) => {
    const newAssocs = req.body;
    try {
      // Récupérez tous les objets existants dans la base de données
      const existingAssocs = await Assoc.find();
      const updateLogs = [];

      // Créez un ensemble (set) des clés (aeb et pcb) des nouvelles données
      const newAssocsKeys = new Set(
        newAssocs.map((assoc) =>
          JSON.stringify({ aeb: assoc.aeb, pcb: assoc.pcb })
        )
      );

      // Parcourez les objets existants et supprimez ceux qui ne sont pas dans les nouvelles données
      for (const existingAssoc of existingAssocs) {
        const existingAssocKey = JSON.stringify({
          aeb: existingAssoc.aeb,
          pcb: existingAssoc.pcb,
        });
        if (!newAssocsKeys.has(existingAssocKey)) {
          await Assoc.deleteOne({ _id: existingAssoc._id }); // Supprime l'objet
          updateLogs.push(`Object deleted: ${existingAssocKey}`);
        }
      }

      // Parcourez les nouvelles données et mettez à jour ou insérez les objets
      for (const assoc of newAssocs) {
        const searchCriteria = { aeb: assoc.aeb, pcb: assoc.pcb };
        const existingObject = await Assoc.findOne(searchCriteria);

        if (existingObject) {
          await Assoc.updateOne(searchCriteria, { $set: assoc });
          updateLogs.push(`Object updated: ${JSON.stringify(assoc)}`);
        } else {
          await new Assoc(assoc).save();
          updateLogs.push(`New object inserted: ${JSON.stringify(assoc)}`);
        }
      }

      res.status(200).json({ message: updateLogs });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "Une erreur s'est produite lors de la mise à jour des associations",
      });
    }
  },
};

module.exports = assocController;
