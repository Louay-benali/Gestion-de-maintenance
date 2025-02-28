// routes/panneRoutes.js
import express from 'express';
import { 
  createPanne, 
  getPannes, 
  getPanneById, 
  updatePanne, 
  deletePanne 
} from '../controllers/panne.js';

const router = express.Router();

router.post('/', createPanne);
router.get('/', getPannes);
router.get('/:idPanne', getPanneById);
router.put('/:idPanne', updatePanne);
router.delete('/:idPanne', deletePanne);

export default router;
