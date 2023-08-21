const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.post("/get", messageController.getMessages);
router.post("/send", messageController.addMessage);

module.exports = router;
