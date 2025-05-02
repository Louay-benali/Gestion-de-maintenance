import express from "express";
import {
  getDemandes,
  validerDemande,
  rejeterDemande,
  approveDemandeIntervention,
  updateDemandeIntervention,
  createDemande,
  deleteDemande,
  consulterDemandesTechniciens,
  verifierDisponibilitePieces,
  suivreApprobationDemande,
} from "../controllers/demande.js";
import { authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authorize(["technicien"]), createDemande);

router.get("/", authorize(["magasinier", "responsable"]), getDemandes); // Suivre l'état des demandes
router.put(
  "/:idDemande/valider",
  authorize(["magasinier", "responsable"]),
  validerDemande
); // Valider une demande
router.put(
  "/:idDemande/rejeter",
  authorize(["magasinier", "responsable"]),
  rejeterDemande
); // Rejeter une demande

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

// 📌 Routes pour consulter les demandes et vérifier la disponibilité des pièces
router.get(
  "/techniciens",
  authorize(["magasinier"]),
  consulterDemandesTechniciens
); // Consulter les demandes des techniciens
router.get(
  "/:idDemande/disponibilite",
  authorize(["magasinier"]),
  verifierDisponibilitePieces
); // Vérifier la disponibilité des pièces demandées

router.get(
  "/:idDemande/suivre",
  authorize(["technicien"]),
  suivreApprobationDemande
); // Suivre l'approbation de la demande

export default router;
