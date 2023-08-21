// authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Récupérer le jeton JWT dans l'en-tête "Authorization"
  const token = req.headers.authorization;

  // Vérifier si la route est celle de connexion (login)
  const isLoginRoute = req.path === "/api/users/login"; // Changez "/login" par votre chemin de connexion


  if (!isLoginRoute && !token) {
    return res.status(401).json({ message: "Aucun jeton fourni" });
  }

  if (!isLoginRoute) {
    // Vérifier le jeton JWT et extraire les données de l'utilisateur
    jwt.verify(token, "votre_clé_secrète", (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Jeton invalide" });
      }

      // Ajouter les informations de l'utilisateur à l'objet req.user
      req.user = decoded;
    });
  }

  next();
};

module.exports = authenticateToken;
