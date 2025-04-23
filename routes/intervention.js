import express from "express";
import {
  creerIntervention,
  getAllInterventions,
  getInterventionById,
  updateIntervention,
  deleteIntervention,
  filterInterventions
} from "../controllers/intervention.js";
import { authorize } from "../middleware/auth.js";

const router = express.Router();

// 📌 CRUD des interventions
router.post("/", creerIntervention); // ✅ Créer une intervention
router.get("/", getAllInterventions); // ✅ Récupérer toutes les interventions
router.get('/filter', authorize(["responsable"]), filterInterventions);
router.get("/:id", getInterventionById); // ✅ Récupérer une intervention par ID
router.put("/:id", updateIntervention); // ✅ Modifier une intervention
router.delete("/:id", deleteIntervention); // ✅ Supprimer une intervention


export default router;