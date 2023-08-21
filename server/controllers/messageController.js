const Messages = require("../models/message");
const Notifications = require("../models/notification");
const User = require("../models/user");

const messageController = {
  getMessages: async (req, res, next) => {
    try {
      const { from, to } = req.body;

      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });

      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      return res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  },

  addMessage: async (req, res, next) => {
    try {
      const { from, to, message } = req.body;
      const senderUser = await User.findById(from);
      const data = await Messages.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });

      await Notifications.create({
        user: to,
        sender: from,
        message: `Vous avez reçu un nouveau message de ${senderUser.firstname} ${senderUser.surname}.`,
        isRead: false,
      });

      if (data) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
      next(ex);
    }
  },
};

module.exports = messageController;
