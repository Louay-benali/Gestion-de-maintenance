import express from "express";
import {
  creerIntervention,
  getAllInterventions,
  getInterventionById,
  updateIntervention,
  deleteIntervention,
  filterInterventions,
  defineInterventionSchedule,
  assignTechnician,
} from "../controllers/intervention.js";
import { authorize } from "../middleware/auth.js";

const router = express.Router();

// 📌 CRUD des interventions
router.post("/", creerIntervention); // ✅ Créer une intervention
router.post(
  "/schedule",
  authorize(["responsable"]),
  defineInterventionSchedule
); // ✅ Définir un calendrier d'intervention
router.post("/assign-technician", authorize(["responsable"]), assignTechnician); // ✅ Assigner un technicien
router.get("/", authorize(["responsable"]), getAllInterventions); // ✅ Récupérer toutes les interventions
router.get("/filter", authorize(["responsable"]), filterInterventions); // ✅ Filtrer les interventions

// ✅ Routes dynamiques (toujours à la fin)
router.get("/:id", authorize(["responsable"]), getInterventionById); // ✅ Récupérer une intervention par ID
router.put("/:id", authorize(["responsable"]), updateIntervention); // ✅ Modifier une intervention
router.delete("/:id", authorize(["responsable"]), deleteIntervention); // ✅ Supprimer une intervention

export default router;
