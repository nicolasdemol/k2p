"use strict";
const Client = require("ssh2-sftp-client");
const fs = require("fs");
const path = require("path");
const Config = require("../models/config");

const config = {
  host: "vm-data",
  port: 22,
  username: "Production",
  password: "K2process",
};

const docController = {
  getDocs: async (req, res) => {
    try {
      // Lire le contenu du fichier cacheDocs.json
      const cacheDocsPath = path.join("./cache/cacheDocs.json"); // Remplacez par le chemin complet de votre fichier
      const cacheDocsContent = await fs.promises.readFile(
        cacheDocsPath,
        "utf-8"
      );

      // Convertir le contenu JSON en objet JavaScript
      const cacheDocs = JSON.parse(cacheDocsContent);

      // Envoyer l'objet JavaScript en tant que réponse JSON
      res.status(200).json(cacheDocs);
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des données :",
        err.message
      );
      res.status(500).send("Internal Server Error");
    }
  },
  refreshDocList: async (req, res) => {
    const client = new Client();
    try {
      const configDoc = await Config.findOne();
      const { remotePath } = configDoc;

      await client.connect(config);
      const getDirectoryTree = async (directory) => {
        const fileList = await client.list(directory);

        const filesAndDirs = [];
        for (const file of fileList) {
          if (file.type === "d") {
            const subDirectory = path.join(directory, file.name);
            const subDirectoryTree = await getDirectoryTree(subDirectory);
            filesAndDirs.push({
              name: file.name,
              type: "d",
              path: subDirectory,
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
  buildDocUrl: async (req, res) => {
    const { doc } = req.body;
    const client = new Client();
    try {
      const configDoc = await Config.findOne();
      const { remotePath, localPath } = configDoc;

      if (!fs.existsSync(localPath)) {
        fs.mkdirSync(localPath, { recursive: true });
      }

      if (!fs.existsSync(localPath + doc.path)) {
        await client.connect(config);
        await client.fastGet(remotePath + doc.path, localPath);
      }
      // Envoie une réponse avec un statut HTTP 200 en cas de succès
      res
        .status(200)
        .json({ url: `http://localhost:4000/api/${localPath}/${doc.path}` });
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
