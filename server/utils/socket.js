const { Server } = require("socket.io");

let io;

exports.socketConnection = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*", // Mettez ici l'URL de votre frontend
    },
  });
  global.onlineUsers = new Map();

  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.emit("online-users", Array.from(onlineUsers.keys()));

    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("get-users", () => {
      socket.emit("online-users", Array.from(onlineUsers.keys()));
    });

    socket.on("new_issue", (newIssue) => {
      socket.emit("new_issue", newIssue);
    });

    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });

    socket.on("disconnect", () => {
      socket.emit("online-users", Array.from(onlineUsers.keys()));
    });
  });
};
