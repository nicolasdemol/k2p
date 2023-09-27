const express = require("express");
const router = express.Router();
const configController = require("../controllers/configController");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.patch("/", adminMiddleware, configController.updateConfig);
router.get("/", configController.getConfig);

module.exports = router;
