import mongoose from "mongoose";
import EtatDemandeEnum from "./etatdemande.js";

const demandeSchema = new mongoose.Schema(
  {
    description: { type: String, required: true }, // Description of the request
    status: {
      type: String,
      enum: [
        EtatDemandeEnum.enAttente,
        EtatDemandeEnum.validee,
        EtatDemandeEnum.rejetee,
      ], // Possible statuses
      default: EtatDemandeEnum.enAttente,
    },
    demandeur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
    }, // User who made the request
    dateDemande: { type: Date, default: Date.now }, // Date of the request
  },
  { timestamps: true }
);

const Demande = mongoose.model("Demande", demandeSchema);
export default Demande;
