import express from "express";
import {
  getDemandes,
  validerDemande,
  rejeterDemande,
  approveDemandeIntervention,
  updateDemandeIntervention,
  createDemande,
  deleteDemande,
} from "../controllers/demande.js";
import { authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authorize(["technicien"]), createDemande);

router.get("/", authorize(["responsable"]), getDemandes); // Suivre l'état des demandes
router.put("/:idDemande/valider", authorize(["responsable"]), validerDemande); // Valider une demande
router.put("/:idDemande/rejeter", authorize(["responsable"]), rejeterDemande); // Rejeter une demande

router.put(
  "/:idDemande/approve",
  authorize(["responsable"]),
  approveDemandeIntervention
);
router.put(
  "/:idDemande/update",
  authorize(["responsable"]),
  updateDemandeIntervention
); // Modifier une demande d'intervention

// 📌 Route pour supprimer une demande
router.delete("/:idDemande", authorize(["responsable"]), deleteDemande); // Supprimer une demande

export default router;
