import express from "express";
import {
  getAllCommandes,
  getCommandeById,
  createCommande,
  updateCommande,
  deleteCommande
} from "../controllers/commande.js";

const router = express.Router();

// 📌 Routes CRUD pour les commandes
router.get("/", getAllCommandes); // Obtenir toutes les commandes
router.get("/:id", getCommandeById); // Obtenir une commande par ID
router.post("/", createCommande); // Créer une commande
router.put("/:id", updateCommande); // Mettre à jour une commande
router.delete("/:id", deleteCommande); // Supprimer une commande

export default router;
