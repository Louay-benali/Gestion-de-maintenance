import mongoose from "mongoose";
import TypeEnum from "../models/typeintervention.js";

const interventionSchema = new mongoose.Schema(
  {
    technicien: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
    },
    machine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      required: true,
    },
    rapport: { type: String },
    type: {
      type: String,
      enum: [TypeEnum.maintenance, TypeEnum.repair], 
      required: true,
    },
  },
  { timestamps: true }
);

const Intervention = mongoose.model("Intervention", interventionSchema);
export default Intervention;
