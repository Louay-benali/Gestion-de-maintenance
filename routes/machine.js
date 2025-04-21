// routes/machineRoutes.js
import express from 'express';
import { createMachine, getMachines, getMachineById, updateMachine, deleteMachine } from '../controllers/machine.js';
import { authorize } from "../middleware/auth.js";

const router = express.Router();

router.post('/', authorize(["ADMIN"]), createMachine);
router.get('/', authorize(["ADMIN"]), getMachines);
router.get('/:idMachine', authorize(["ADMIN"]), getMachineById);
router.put('/:idMachine', authorize(["ADMIN"]), updateMachine);
router.delete('/:idMachine', authorize(["ADMIN"]), deleteMachine);

export default router;
