import Commande from "../models/commande.js";
import { Utilisateur } from "../models/user.js";
import logger from "../utils/logger.js";

// 📌 Obtenir toutes les commandes
export const getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find().populate("magasinier", "nom prenom email");
    logger.info(`[COMMANDE] Récupération de toutes les commandes (${commandes.length})`);
    res.status(200).json(commandes);
  } catch (error) {
    logger.error(`[COMMANDE] Erreur récupération toutes les commandes : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Obtenir une commande par ID
export const getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id).populate("magasinier", "nom prenom email");
    if (!commande) {
      logger.warn(`[COMMANDE] Commande non trouvée : ${req.params.id}`);
      return res.status(404).json({ message: "Commande non trouvée" });
    }
    logger.info(`[COMMANDE] Commande récupérée : ${req.params.id}`);
    res.status(200).json(commande);
  } catch (error) {
    logger.error(`[COMMANDE] Erreur récupération commande : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Créer une commande
export const createCommande = async (req, res) => {
  try {
    const { magasinier, fournisseur, statut } = req.body;

    const existingMagasigner = await Utilisateur.findById(magasinier);
    if (!existingMagasigner) {
      logger.warn(`[COMMANDE] magasinier non trouvé : ID ${magasinier}`);
      return res.status(404).json({ message: "magasinier non trouvé" });
    }

    if (!magasinier || !fournisseur) {
      logger.warn("[COMMANDE] Champs requis manquants lors de la création");
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const nouvelleCommande = new Commande({
      magasinier,
      fournisseur,
      statut
    });

    await nouvelleCommande.save();
    logger.info(`[COMMANDE] Nouvelle commande créée par ${magasinier}`);
    res.status(201).json({ message: "Commande créée avec succès", commande: nouvelleCommande });
  } catch (error) {
    logger.error(`[COMMANDE] Erreur création commande : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Mettre à jour une commande
export const updateCommande = async (req, res) => {
  try {
    const { magasinier, fournisseur, statut } = req.body;

    const existingMagasigner = await Utilisateur.findById(magasinier);
    if (!existingMagasigner) {
      logger.warn(`[COMMANDE] magasinier non trouvé : ID ${magasinier}`);
      return res.status(404).json({ message: "magasinier non trouvé" });
    }

    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      logger.warn(`[COMMANDE] Commande à mettre à jour non trouvée : ${req.params.id}`);
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    if (magasinier) commande.magasinier = magasinier;
    if (fournisseur) commande.fournisseur = fournisseur;
    if (statut) commande.statut = statut;

    await commande.save();
    logger.info(`[COMMANDE] Commande mise à jour : ${req.params.id}`);
    res.status(200).json({ message: "Commande mise à jour avec succès", commande });
  } catch (error) {
    logger.error(`[COMMANDE] Erreur mise à jour commande : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Supprimer une commande
export const deleteCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndDelete(req.params.id);
    if (!commande) {
      logger.warn(`[COMMANDE] Commande à supprimer non trouvée : ${req.params.id}`);
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    logger.info(`[COMMANDE] Commande supprimée : ${req.params.id}`);
    res.status(200).json({ message: "Commande supprimée avec succès" });
  } catch (error) {
    logger.error(`[COMMANDE] Erreur suppression commande : ${error.message}`);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
