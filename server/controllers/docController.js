"use strict";
const Client = require("ssh2-sftp-client");
const fs = require("fs");
const path = require("path");

const config = {
  host: "vm-data",
  port: 22,
  username: "Production",
  password: "K2process",
};

const docController = {
  listFiles: async (req, res) => {
    const { remotePath } = req.body;

    const client = new Client();

    try {
      await client.connect(config);

      // Fonction récursive pour obtenir la structure arborescente
      const getDirectoryTree = async (directory) => {
        const fileList = await client.list(directory);

        const filesAndDirs = [];
        for (const file of fileList) {
          if (file.type === "d") {
            // Si c'est un répertoire, récursivement obtenir sa structure
            const subDirectory = path.join(directory, file.name);
            const subDirectoryTree = await getDirectoryTree(subDirectory);
            filesAndDirs.push({
              name: file.name,
              type: "d",
              children: subDirectoryTree,
            });
          } else {
            filesAndDirs.push({ name: file.name, type: "f" });
          }
        }

        return filesAndDirs;
      };

      const directoryTree = await getDirectoryTree(remotePath);

      res.status(200).json(directoryTree);
    } catch (err) {
      console.error(
        "Erreur lors de la récupération de l'arborescence :",
        err.message
      );
      res.status(500).send("Internal Server Error");
    } finally {
      client.end();
    }
  },
  downloadDoc: async (req, res) => {
    const { remotePath, localPath } = req.body;
    const client = new Client();

    try {
      // Créez le répertoire local si il n'existe pas
      const localDirectory = path.dirname(localPath);
      if (!fs.existsSync(localDirectory)) {
        fs.mkdirSync(localDirectory, { recursive: true });
      }

      await client.connect(config);
      await client.fastGet(remotePath, localPath);

      // Envoie une réponse avec un statut HTTP 200 en cas de succès
      res.status(200).send("Téléchargement réussi");
    } catch (err) {
      console.error("Erreur lors du téléchargement du fichier :", err.message);

      // Envoie une réponse avec un statut HTTP 500 en cas d'erreur
      res.status(500).send("Erreur lors du téléchargement");
    } finally {
      await client.end();
    }
  },
  downloadDoc: async (req, res) => {
    const { remotePath, localPath } = req.body;
    const client = new Client();

    try {
      // Créez le répertoire local si il n'existe pas
      const localDirectory = path.dirname(localPath);
      if (!fs.existsSync(localDirectory)) {
        fs.mkdirSync(localDirectory, { recursive: true });
      }

      await client.connect(config);
      await client.fastGet(remotePath, localPath);

      // Envoie une réponse avec un statut HTTP 200 en cas de succès
      res.status(200).send("Téléchargement réussi");
    } catch (err) {
      console.error("Erreur lors du téléchargement du fichier :", err.message);

      // Envoie une réponse avec un statut HTTP 500 en cas d'erreur
      res.status(500).send("Erreur lors du téléchargement");
    } finally {
      await client.end();
    }
  },
  downloadDoc: async (req, res) => {
    const { remotePath, localPath } = req.body;
    const client = new Client();

    try {
      // Créez le répertoire local si il n'existe pas
      const localDirectory = path.dirname(localPath);
      if (!fs.existsSync(localDirectory)) {
        fs.mkdirSync(localDirectory, { recursive: true });
      }

      await client.connect(config);
      await client.fastGet(remotePath, localPath);

      // Envoie une réponse avec un statut HTTP 200 en cas de succès
      res.status(200).send("Téléchargement réussi");
    } catch (err) {
      console.error("Erreur lors du téléchargement du fichier :", err.message);

      // Envoie une réponse avec un statut HTTP 500 en cas d'erreur
      res.status(500).send("Erreur lors du téléchargement");
    } finally {
      await client.end();
    }
  },
};

module.exports = docController;
