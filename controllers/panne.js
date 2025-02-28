// controllers/panneController.js
import Panne from '../models/panne.js';

// Créer une nouvelle panne
export const createPanne = async (req, res) => {
  try {
    const { description, operateur, machine , dateDeclaration, etat } = req.body;
    const newPanne = new Panne({
      description,
      operateur,
      machine,
      dateDeclaration,
      etat
    });
    await newPanne.save();
    res.status(201).json({ message: 'Panne créée avec succès', newPanne });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de la panne', error });
  }
};

// Obtenir toutes les pannes
export const getPannes = async (req, res) => {
  try {
    const pannes = await Panne.find().populate('operateur machine');
    res.status(200).json(pannes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des pannes', error });
  }
};

// Obtenir une panne par ID
export const getPanneById = async (req, res) => {
  try {
    const { idPanne } = req.params;
    const panne = await Panne.findById(idPanne).populate('operateur machine');
    if (!panne) {
      return res.status(404).json({ message: 'Panne non trouvée' });
    }
    res.status(200).json(panne);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la panne', error });
  }
};

// Mettre à jour une panne
export const updatePanne = async (req, res) => {
  try {
    const { idPanne } = req.params;
    const { description, etat, operateur, machine, dateDeclaration } = req.body;
    const updatedPanne = await Panne.findByIdAndUpdate(
      idPanne,
      { description, etat, operateur, machine, dateDeclaration },
      { new: true }
    );
    if (!updatedPanne) {
      return res.status(404).json({ message: 'Panne non trouvée' });
    }
    res.status(200).json({ message: 'Panne mise à jour avec succès', updatedPanne });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la panne', error });
  }
};

// Supprimer une panne
export const deletePanne = async (req, res) => {
  try {
    const { idPanne } = req.params;
    const deletedPanne = await Panne.findByIdAndDelete(idPanne);
    if (!deletedPanne) {
      return res.status(404).json({ message: 'Panne non trouvée' });
    }
    res.status(200).json({ message: 'Panne supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la panne', error });
  }
};
