const Client = require("ssh2-sftp-client");
const fs = require("fs");

const config = {
  host: "vm-data",
  port: 22,
  username: "Production",
  password: "K2process",
};

const docController = {
  getDoc: async (req, res) => {
    const { ref, type } = req.params;
    const remotePath = "/D:/QUALITE/FICHE_INTRANET"; // This should be the mounted path on the remote server

    const conn = new Client();

    try {
      await conn.connect(config);
      const fileList = await conn.list(`${remotePath}/${type}`);

      // Rechercher le fichier qui contient le numéro de référence (ref)
      const fileWithRef = fileList.find((file) => file.name.includes(ref));

      if (fileWithRef) {
        const remoteFilePath = `${remotePath}/${type}/${fileWithRef.name}`;

        // Lire le contenu du fichier
        const fileContent = await conn.get(remoteFilePath);

        // Envoyer le contenu du fichier au client
        res.setHeader("Content-Type", "application/pdf");
        res.end(fileContent);
      } else {
        res.status(404).send("File Not Found");
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des fichiers :", err.message);
      res.status(500).send("Internal Server Error");
    } finally {
      conn.end();
    }
  },
};

module.exports = docController;
