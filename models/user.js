import mongoose from "mongoose";
import bcrypt from "bcrypt";
import RolesEnum from "../models/role.js";

const { Schema, model } = mongoose;

const utilisateurSchema = new Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    role: {
      type: String,
      enum: [RolesEnum.OPERATEUR, RolesEnum.TECHNICIEN, RolesEnum.MAGASINIER, RolesEnum.RESPONSABLE, RolesEnum.ADMIN],
      required: true,
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);
export const Utilisateur = model("Utilisateur", utilisateurSchema);