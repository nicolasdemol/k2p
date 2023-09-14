const express = require("express");
const router = express.Router();
const assocController = require("../controllers/assocController");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post("/add", adminMiddleware, assocController.addAssoc);
router.delete("/:id", adminMiddleware, assocController.delAssoc);
router.get("/get/:ref", assocController.getAssocByRef);
router.get("/get", assocController.getAllAssocs);

module.exports = router;
