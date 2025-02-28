import { Utilisateur } from "../models/user.js";
import bcrypt from "bcrypt";

// 📌 Obtenir tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    const users = await Utilisateur.find().select("-motDePasse"); // Exclure le mot de passe
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Obtenir un utilisateur par ID
export const getUserById = async (req, res) => {
  try {
    const user = await Utilisateur.findById(req.params.id).select("-motDePasse");
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Créer un utilisateur
export const createUser = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, role } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await Utilisateur.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

    // Hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(motDePasse, salt);

    // Création de l'utilisateur
    const newUser = new Utilisateur({
      nom,
      prenom,
      email,
      motDePasse: hashedPassword,
      role
    });

    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, role } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await Utilisateur.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    // Mise à jour des champs
    if (nom) user.nom = nom;
    if (prenom) user.prenom = prenom;
    if (email) user.email = email;
    if (role) user.role = role;

    // Hachage du nouveau mot de passe si changé
    if (motDePasse) {
      const salt = await bcrypt.genSalt(10);
      user.motDePasse = await bcrypt.hash(motDePasse, salt);
    }

    await user.save();
    res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  try {
    const user = await Utilisateur.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
