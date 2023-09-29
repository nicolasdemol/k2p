const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post("/signup", adminMiddleware, userController.signup);
router.get("/", userController.getAllUsers);
router.delete("/:id", adminMiddleware, userController.removeUser);
router.post("/login", userController.login);
// Autres routes liées aux utilisateurs

module.exports = router;
