import mongoose from "mongoose";
const panneSchema = new mongoose.Schema({
    description: { type: String, required: true },
    dateDeclaration: { type: Date, default: Date.now },
    etat: { type: String, enum: ["ouverte", "en cours", "résolue"], default: "ouverte" },
    operateur: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
    machine: { type: mongoose.Schema.Types.ObjectId, ref: "Machine", required: true },
  });
  
  const Panne = mongoose.model("Panne", panneSchema);
  export default Panne;
  