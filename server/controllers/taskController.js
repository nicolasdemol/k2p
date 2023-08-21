const Task = require("../models/task");

const taskController = {
  addTask: async (req, res) => {
    try {
      const { id, title, status, label, priority } = req.body;

      let newId;
      if (id) {
        newId = id; // Use provided ID
      } else {
        const lastTask = await Task.findOne({}, {}, { sort: { id: -1 } }); // Get the last task
        if (lastTask) {
          const lastId = parseInt(lastTask.id.split("-")[1]);
          newId = `TASK-${(lastId + 1).toString().padStart(4, "0")}`;
        } else {
          newId = "TASK-0001";
        }
      }

      const newTask = new Task({
        id: newId,
        title,
        status,
        label,
        priority,
      });
      await newTask.save();
      res.status(200).json({ message: "Tâche ajoutée avec succès." });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche", error);
      res.status(500).json({ message: "Erreur lors de l'ajout de la tâche." });
    }
  },

  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des tâches." });
    }
  },

  removeTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      await Task.deleteOne({ id: taskId });
      res.status(200).json({ message: "Tâche supprimée avec succès." });
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression de la tâche." });
    }
  },
};

module.exports = taskController;
