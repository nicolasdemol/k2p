const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post("/signup", adminMiddleware, userController.signup);
router.get("/get", userController.getAllUsers);
router.post("/login", userController.login);
// Autres routes liées aux utilisateurs

module.exports = router;
