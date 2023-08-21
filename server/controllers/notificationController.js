const Notifications = require("../models/notification");

const notificationController = {
  getUnreadNotifications: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const notifications = await Notifications.find({
        user: userId,
        isRead: false,
      })
        .populate("sender") // Peupler avec l'utilisateur
        .sort({ createdAt: -1 });
      return res.json(notifications);
    } catch (ex) {
      next(ex);
    }
  },

  markNotificationAsRead: async (req, res, next) => {
    try {
      const { notificationId } = req.params;
      const notification = await Notifications.findById(notificationId);
      if (notification) {
        notification.isRead = true;
        await notification.save();
        return res.json({ msg: "Notification marked as read." });
      } else {
        return res.status(404).json({ msg: "Notification not found." });
      }
    } catch (ex) {
      next(ex);
    }
  },
};

module.exports = notificationController;
