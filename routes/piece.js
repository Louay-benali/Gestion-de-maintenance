// routes/pieceRoutes.js
import express from 'express';
import { 
  createPiece, 
  getPieces, 
  getPieceById, 
  updatePiece, 
  deletePiece 
} from '../controllers/piece.js';

const router = express.Router();

router.post('/', createPiece);
router.get('/', getPieces);
router.get('/:idPiece', getPieceById);
router.put('/:idPiece', updatePiece);
router.delete('/:idPiece', deletePiece);

export default router;
