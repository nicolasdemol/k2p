const express = require("express");
const router = express.Router();
const docController = require("../controllers/docController");

router.post("/", docController.downloadDoc);
router.post("/tree", docController.listFiles);

module.exports = router;
