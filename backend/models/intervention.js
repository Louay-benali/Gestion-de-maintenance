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
    status: {
      type: String,
      enum: ["Complete", "En cours", "Reporté"],
      default: "en cours",
    },
    delai: {
      type: Number, // Assuming delay is stored as a number (e.g., in hours or days)
      required: false, // Optional field
    },
  },
  { timestamps: true }
);

const Intervention = mongoose.model("Intervention", interventionSchema);
export default Intervention;
