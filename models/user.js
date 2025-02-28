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
      enum: [RolesEnum.OPERATOR, RolesEnum.TECHNICIAN, RolesEnum.STOREKEEPER, RolesEnum.MANAGER, RolesEnum.ADMIN],
      required: true,
    },
  },
  { timestamps: true }
);

// Middleware pour hacher le mot de passe
utilisateurSchema.pre("save", async function (next) {
  if (!this.isModified("motDePasse")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
  next();
});

// Méthode pour comparer les mots de passe
utilisateurSchema.methods.compareMotDePasse = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.motDePasse);
};

export const Utilisateur = model("Utilisateur", utilisateurSchema);