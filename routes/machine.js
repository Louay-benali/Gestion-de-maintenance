// routes/machineRoutes.js
import express from 'express';
import { createMachine, getMachines, getMachineById, updateMachine, deleteMachine } from '../controllers/machine.js';

const router = express.Router();

router.post('/', createMachine);
router.get('/', getMachines);
router.get('/:id', getMachineById);
router.put('/:id', updateMachine);
router.delete('/:id', deleteMachine);

export default router;
