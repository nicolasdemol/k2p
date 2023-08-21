const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issueController");

router.post("/add", issueController.addIssue);
router.get("/get", issueController.getAllIssues);
router.get("/get/:cardId", issueController.getIssueById);

module.exports = router;
