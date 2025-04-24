// routes/pieceRoutes.js
import express from 'express';
import { 
  createPiece, 
  getPieces, 
  getPieceById, 
  updatePiece, 
  deletePiece 
} from '../controllers/piece.js';
import { authorize } from "../middleware/auth.js";

const router = express.Router();

router.post('/', createPiece);
router.get('/', authorize(["magasinier"]), getPieces);
router.get('/:idPiece', getPieceById);
router.put('/:idPiece', authorize(["magasinier"]), updatePiece);
router.delete('/:idPiece', deletePiece);

export default router;
