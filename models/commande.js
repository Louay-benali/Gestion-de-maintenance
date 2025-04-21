import mongoose from "mongoose";
import StatutEnum from "../models/statut.js";

const commandeSchema = new mongoose.Schema({
    magasinier: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
    fournisseur: { type: String, required: true },
    statut: {
      type: String,
      enum: [StatutEnum.ENATTENTE, StatutEnum.VALIDEE, StatutEnum.LIVREE],
      required: true,
    },
  },
  { timestamps: true }
);
  
  const Commande = mongoose.model("Commande", commandeSchema);
  export default Commande;
  