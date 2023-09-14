const fs = require("fs");

exports.cleanTemp = () => {
  const tmpDir = "./tmp";
  console.log("Nettoyage des fichiers temporaires en cours...");
  fs.rm(tmpDir, { recursive: true });
};
