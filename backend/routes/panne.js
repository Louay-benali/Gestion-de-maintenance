// routes/panneRoutes.js
import express from "express";
import {
  createPanne,
  getPannes,
  getPanneById,
  updatePanne,
  deletePanne,
  confirmerResolution,
} from "../controllers/panne.js";
import { authorize } from "../middleware/auth.js"; // Assurez-vous que le chemin est correct

const router = express.Router();

router.post("/", authorize(["operateur" , "technicien"]), createPanne); // Corrected syntax for authorize
router.get("/", getPannes);
router.get("/:idPanne", getPanneById);
router.put("/:idPanne", updatePanne);
router.delete("/:idPanne", deletePanne);
router.put(
  "/:idPanne/confirmer",
  authorize(["technicien"]),
  confirmerResolution
);

export default router;
