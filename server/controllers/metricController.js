const Metric = require("../models/metric");

const metricController = {
  addMetric: async (req, res) => {
    try {
      const { metricType, amount, period, unit } = req.body;

      const newMetric = new Metric({
        metricType,
        amount,
        period,
        unit,
      });

      await newMetric.save();
      res.status(200).json({ message: "Métrique ajoutée avec succès." });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la métrique", error);
      res
        .status(500)
        .json({ message: "Erreur lors de l'ajout de la métrique." });
    }
  },

  // Récupérer les valeurs de CA dans un intervalle de périodes
  getCA: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      // Convertir les dates en objets Date
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Récupérer les valeurs de CA dans l'intervalle de périodes
      const caValues = await Metric.find({
        metricType: "CA",
        period: { $gte: start, $lte: end },
      });

      res.status(200).json(caValues);
    } catch (error) {
      console.error("Erreur lors de la récupération des valeurs de CA", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des valeurs de CA." });
    }
  },
  // Récupérer les valeurs de productivity dans un intervalle de périodes
  getProductivity: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      // Convertir les dates en objets Date
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Récupérer les valeurs de CA dans l'intervalle de périodes
      const productivityValues = await Metric.find({
        metricType: "productivity",
        period: { $gte: start, $lte: end },
      });

      res.status(200).json(productivityValues);
    } catch (error) {
      console.error("Erreur lors de la récupération des valeurs de productivity", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des valeurs de productivity." });
    }
  },
};

module.exports = metricController;
