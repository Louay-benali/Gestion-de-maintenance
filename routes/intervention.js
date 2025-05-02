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
  getDetailsEquipement,
  getTachesAssignees,
  addObservation,
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
router.get("/", authorize(["responsable", "technicien"]), getAllInterventions); // ✅ Récupérer toutes les interventions
router.get(
  "/filter",
  authorize(["responsable", "technicien"]),
  filterInterventions
); // ✅ Filtrer les interventions

router.get(
  "/equipement/:machineId",
  authorize(["technicien", "responsable"]),
  getDetailsEquipement
); // Voir les détails des équipements concernés
router.get(
  "/taches/:technicienId",
  authorize(["technicien"]),
  getTachesAssignees
); // Consulter les tâches assignées

router.get("/:id", authorize(["responsable"]), getInterventionById); // ✅ Récupérer une intervention par ID
router.put("/:id", authorize(["responsable"]), updateIntervention); // ✅ Modifier une intervention
router.put("/:id/observation", authorize(["technicien"]), addObservation); // Mentionner des observations
router.delete("/:id", authorize(["responsable"]), deleteIntervention); // ✅ Supprimer une intervention

export default router;
