const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/get", taskController.getAllTasks);
router.post("/add", taskController.addTask);
router.delete("/:id", taskController.removeTask);

module.exports = router;
