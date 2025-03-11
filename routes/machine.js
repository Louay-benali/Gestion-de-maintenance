// routes/machineRoutes.js
import express from 'express';
import { createMachine, getMachines, getMachineById, updateMachine, deleteMachine } from '../controllers/machine.js';

const router = express.Router();

router.post('/', createMachine);
router.get('/', getMachines);
router.get('/:idMachine', getMachineById);
router.put('/:idMachine', updateMachine);
router.delete('/:idMachine', deleteMachine);

export default router;
