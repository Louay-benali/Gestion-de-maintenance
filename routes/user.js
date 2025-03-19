import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  
} from "../controllers/user.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.js";// Middleware pour protéger les routes


const router = express.Router();

// 📌 Routes d'authentification
router.post("/login", loginUser); // Connexion
router.post("/create",createUser);//


// 📌 Routes CRUD pour les utilisateurs
router.get("/", authenticateToken, authorizeRoles("ADMIN", "MANAGER"), getAllUsers); // Obtenir tous les utilisateurs
router.get("/:id", authenticateToken, getUserById); // Obtenir un utilisateur par ID
router.put("/:id", authenticateToken, authorizeRoles("ADMIN"), updateUser); // Mettre à jour un utilisateur
router.delete("/:id", authenticateToken, authorizeRoles("ADMIN"), deleteUser); // Supprimer un utilisateur
export default router;
