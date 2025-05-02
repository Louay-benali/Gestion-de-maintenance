// routes/machineRoutes.js
import express from "express";
import {
  createMachine,
  getMachines,
  getMachineById,
  updateMachine,
  deleteMachine,
  getMachineStatus,
} from "../controllers/machine.js";
import { authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authorize(["admin"]), createMachine);
router.get("/status", authorize(["operateur"]), getMachineStatus); 
router.get("/", authorize(["admin"]), getMachines);
router.get("/:idMachine", authorize(["admin"]), getMachineById);
router.put("/:idMachine", authorize(["admin"]), updateMachine);
router.delete("/:idMachine", authorize(["admin"]), deleteMachine);
export default router;
