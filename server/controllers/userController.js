const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const userController = {
  signup: async (req, res) => {
    try {
      const { username, password, firstname, surname, role } = req.body;

      // Vérifier si l'utilisateur existe déjà dans la base de données
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Cet utilisateur existe déjà." });
      }

      // Hash du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer un nouvel utilisateur
      const newUser = new User({
        username,
        password: hashedPassword,
        firstname,
        surname,
        role,
      });

      await newUser.save();

      res.status(200).json({ message: "Inscription réussie." });
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      res.status(500).json({ message: "Erreur lors de l'inscription." });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Vérifier si l'utilisateur existe dans la base de données
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }

      // Vérifier le mot de passe
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      // Générer un jeton JWT
      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
          firstname: user.firstname,
          surname: user.surname,
          role: user.role,
        },
        "votre_clé_secrète"
      );

      res.status(200).json({ user: user, token: token });
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
      res.status(500).json({ message: "Erreur lors de la connexion" });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      // Récupérer tous les utilisateurs depuis la base de données
      const users = await User.find({}, { password: 0 }); // Exclure le champ "password" des résultats

      res.status(200).json(users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des utilisateurs." });
    }
  },

  // Autres fonctions de gestion des utilisateurs si nécessaire
};

module.exports = userController;
