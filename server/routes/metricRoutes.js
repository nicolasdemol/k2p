const express = require("express");
const router = express.Router();
const metricController = require("../controllers/metricController");

router.get("/ca", metricController.getCA);
router.get("/productivity", metricController.getProductivity);
router.post("/", metricController.addMetric);

module.exports = router;
