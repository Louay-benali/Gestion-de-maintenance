import mongoose from "mongoose";
const interventionSchema = new mongoose.Schema({
    technicien: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
    machine: { type: mongoose.Schema.Types.ObjectId, ref: "Machine", required: true },
    rapport: { type: String },
  },
  { timestamps: true }
);
  
  const Intervention = mongoose.model("Intervention", interventionSchema);
  export default Intervention;
  