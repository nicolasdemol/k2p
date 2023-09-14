const Task = require("../models/task");

const taskController = {
  addTask: async (req, res) => {
    try {
      const { title, status, label, priority, assignedTo } = req.body;

      if (!title || !status || !assignedTo) {
        return res
          .status(400)
          .json({
            message: "Le titre, le statut et l'attribution sont requis.",
          });
      }

      let newId;
      const lastTask = await Task.findOne({}, {}, { sort: { id: -1 } });
      const lastId = lastTask ? parseInt(lastTask.id.split("-")[1]) : 0;
      newId = `TASK-${(lastId + 1).toString().padStart(4, "0")}`;

      const newTask = new Task({
        id: newId,
        title,
        status,
        priority,
        assignedTo,
      });
      await newTask.save();
      res.status(201).json({ message: "Tâche ajoutée avec succès." });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche", error);
      res
        .status(500)
        .json({
          message: "Erreur lors de l'ajout de la tâche.",
          error: error.message,
        });
    }
  },

  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find().populate("assignedTo"); // Charger les utilisateurs associés
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches", error);
      res
        .status(500)
        .json({
          message: "Erreur lors de la récupération des tâches.",
          error: error.message,
        });
    }
  },

  removeTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findOne({ id: taskId });
      if (!task) {
        return res.status(404).json({ message: "Tâche non trouvée." });
      }
      await Task.deleteOne({ id: taskId });
      res.status(204).json({ message: "Tâche supprimée avec succès." });
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche", error);
      res
        .status(500)
        .json({
          message: "Erreur lors de la suppression de la tâche.",
          error: error.message,
        });
    }
  },
};

module.exports = taskController;
