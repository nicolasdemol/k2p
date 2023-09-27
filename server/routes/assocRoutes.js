const express = require("express");
const router = express.Router();
const assocController = require("../controllers/assocController");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.get("/", assocController.getAllAssocs);
router.post("/", assocController.updateAssocs);

module.exports = router;
