import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.js";

const router = express.Router();

// 📌 Routes CRUD pour les utilisateurs
router.get("/", getAllUsers); // Obtenir tous les utilisateurs
router.get("/:id", getUserById); // Obtenir un utilisateur par ID
router.post("/", createUser); // Créer un utilisateur
router.put("/:id", updateUser); // Mettre à jour un utilisateur
router.delete("/:id", deleteUser); // Supprimer un utilisateur

export default router;
