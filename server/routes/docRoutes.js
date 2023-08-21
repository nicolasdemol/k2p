const express = require("express");
const router = express.Router();
const docController = require("../controllers/docController");

router.get("/get/:ref/:type", docController.getDoc);

module.exports = router;
