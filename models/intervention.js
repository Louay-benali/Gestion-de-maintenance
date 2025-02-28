import mongoose from "mongoose";
const interventionSchema = new mongoose.Schema({
    technicien: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
    machine: { type: mongoose.Schema.Types.ObjectId, ref: "Machine", required: true },
    dateIntervention: { type: Date, default: Date.now },
    rapport: { type: String },
  });
  
  const Intervention = mongoose.model("Intervention", interventionSchema);
  export default Intervention;
  