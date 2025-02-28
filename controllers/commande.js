import Commande from "../models/commande.js";

// 📌 Obtenir toutes les commandes
export const getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find().populate("magasinier", "nom prenom email");
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Obtenir une commande par ID
export const getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id).populate("magasinier", "nom prenom email");
    if (!commande) return res.status(404).json({ message: "Commande non trouvée" });
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Créer une commande
export const createCommande = async (req, res) => {
  try {
    const { magasinier, fournisseur, statut } = req.body;

    // Vérification des champs requis
    if (!magasinier || !fournisseur) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Création de la commande
    const nouvelleCommande = new Commande({
      magasinier,
      fournisseur,
      statut
    });

    await nouvelleCommande.save();
    res.status(201).json({ message: "Commande créée avec succès", commande: nouvelleCommande });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Mettre à jour une commande
export const updateCommande = async (req, res) => {
  try {
    const { magasinier, fournisseur, statut } = req.body;

    // Vérifier si la commande existe
    const commande = await Commande.findById(req.params.id);
    if (!commande) return res.status(404).json({ message: "Commande non trouvée" });

    // Mise à jour des champs
    if (magasinier) commande.magasinier = magasinier;
    if (fournisseur) commande.fournisseur = fournisseur;
    if (statut) commande.statut = statut;

    await commande.save();
    res.status(200).json({ message: "Commande mise à jour avec succès", commande });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// 📌 Supprimer une commande
export const deleteCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndDelete(req.params.id);
    if (!commande) return res.status(404).json({ message: "Commande non trouvée" });

    res.status(200).json({ message: "Commande supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
