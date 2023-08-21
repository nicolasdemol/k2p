// adminMiddleware.js

const adminMiddleware = (req, res, next) => {
  // Vérifier si l'utilisateur est connecté et a le rôle "admin"
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Vous n'êtes pas autorisé à effectuer cette action" });
  }

  // Si l'utilisateur est administrateur, continuez avec la prochaine fonction de middleware
  next();
};

module.exports = adminMiddleware;
