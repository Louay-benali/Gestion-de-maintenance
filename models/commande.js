import mongoose from "mongoose";
const commandeSchema = new mongoose.Schema({
    magasinier: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
    fournisseur: { type: String, required: true },
    dateCommande: { type: Date, default: Date.now },
    statut: { type: String, enum: ["en attente", "validée", "livrée"], default: "en attente" },
  });
  
  const Commande = mongoose.model("Commande", commandeSchema);
  export default Commande;
  