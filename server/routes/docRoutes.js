const express = require("express");
const router = express.Router();
const docController = require("../controllers/docController");

router.get("/", docController.getDocs);
router.get("/refresh", docController.refreshDocList);
router.post("/", docController.buildDocUrl);

module.exports = router;
