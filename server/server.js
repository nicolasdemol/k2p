const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const cron = require("node-cron");
const { socketConnection } = require("./utils/socket");
const { cleanTemp } = require("./utils/clean");

const userRoutes = require("./routes/userRoutes");
const cardRoutes = require("./routes/cardRoutes");
const assocRoutes = require("./routes/assocRoutes");
const docRoutes = require("./routes/docRoutes");
const issueRoutes = require("./routes/issueRoutes");
const messageRoutes = require("./routes/messageRoutes");
const taskRoutes = require("./routes/taskRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const metricRoutes = require("./routes/metricRoutes");
const configRoutes = require("./routes/configRoutes");

const app = express();
const httpServer = createServer(app);
socketConnection(httpServer);

const SERVER_IP = "localhost";
const port = 4000;

// Configuration de la connexion MongoDB
const mongoURI =
  "mongodb+srv://nyax2:nWUB1Oaf9lzikQms@cluster0.d2nbu8r.mongodb.net/k2p?retryWrites=true&w=majority";
// const mongoURI = `mongodb://${SERVER_IP}:27017/k2p`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Erreur de connexion à MongoDB", err));

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());

// Middleware CORS
app.use(cors());

// Middleware d'authentification
const authenticateToken = require("./middlewares/authenticateMiddleware");
app.use(authenticateToken);

// Utiliser les routes pour les utilisateurs
app.use("/api/users", userRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/assocs", assocRoutes);
app.use("/api/docs", docRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/metrics", metricRoutes);
app.use("/api/configs", configRoutes);
app.use("/api/tmp", express.static("./tmp"));

// Planifiez la tâche de nettoyage tous les jours à 05h00
cron.schedule("0 5 * * *", () => {
  cleanTemp();
});

// Démarrer le serveur
httpServer.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
