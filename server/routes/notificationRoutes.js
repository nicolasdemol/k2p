const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Route pour obtenir les notifications non lues d'un utilisateur
router.get("/:userId/unread", notificationController.getUnreadNotifications);

// Route pour marquer une notification comme lue
router.patch(
  "/:notificationId/mark",
  notificationController.markNotificationAsRead
);

module.exports = router;
