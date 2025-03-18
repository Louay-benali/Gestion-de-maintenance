import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.js";
import { authorize } from "../middleware/auth.js"; // Middleware d'autorisation

const router = express.Router();

// 📌 Routes CRUD pour les utilisateurs (réservé aux administrateurs)
router.get("/", authorize(["ADMIN"]), getAllUsers); // Obtenir tous les utilisateurs
router.get("/:id", authorize(["ADMIN"]), getUserById); // Obtenir un utilisateur par ID
router.post("/", authorize(["ADMIN"]), createUser); // Créer un utilisateur
router.put("/:id", authorize(["ADMIN"]), updateUser); // Mettre à jour un utilisateur
router.delete("/:id", authorize(["ADMIN"]), deleteUser); // Supprimer un utilisateur

export default router;
