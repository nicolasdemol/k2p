const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issueController");

router.post("/", issueController.addIssue);
router.get("/", issueController.getAllIssues);
router.delete("/:id", issueController.deleteIssue);

module.exports = router;
