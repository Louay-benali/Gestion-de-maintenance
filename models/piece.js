import mongoose from "mongoose";

const pieceSchema = new mongoose.Schema({
    nomPiece: { type: String, required: true },
    quantite: { type: Number, required: true },
  });
  
  const PieceRechange = mongoose.model("PieceRechange", pieceSchema);
  export default PieceRechange;
  