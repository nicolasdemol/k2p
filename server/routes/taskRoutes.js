const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getAllTasks);
router.post("/", taskController.addTask);
router.delete("/:id", taskController.removeTask);

module.exports = router;
