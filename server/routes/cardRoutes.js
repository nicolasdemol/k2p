const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post("/add", adminMiddleware, cardController.addCard);
router.delete("/:id", adminMiddleware, cardController.removeCard);
router.post("/many", adminMiddleware, cardController.addManyCards);
router.get("/get", cardController.getAllCards);
router.get("/get/:ref", cardController.getCardsByRef);

module.exports = router;
