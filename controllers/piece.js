// controllers/pieceController.js
import PieceRechange from '../models/piece.js';

// Créer une nouvelle pièce de rechange
export const createPiece = async (req, res) => {
  try {
    const { nomPiece, quantite } = req.body;
    const newPiece = new PieceRechange({
      nomPiece,
      quantite
    });
    await newPiece.save();
    res.status(201).json({ message: 'Pièce de rechange créée avec succès', newPiece });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de la pièce de rechange', error });
  }
};

// Obtenir toutes les pièces de rechange
export const getPieces = async (req, res) => {
  try {
    const pieces = await PieceRechange.find();
    res.status(200).json(pieces);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des pièces de rechange', error });
  }
};

// Obtenir une pièce de rechange par ID
export const getPieceById = async (req, res) => {
  try {
    const { idPiece } = req.params;
    const piece = await PieceRechange.findById(idPiece);
    if (!piece) {
      return res.status(404).json({ message: 'Pièce de rechange non trouvée' });
    }
    res.status(200).json(piece);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la pièce de rechange', error });
  }
};

// Mettre à jour une pièce de rechange
export const updatePiece = async (req, res) => {
  try {
    const { idPiece } = req.params;
    const { nomPiece, quantite } = req.body;
    const updatedPiece = await PieceRechange.findByIdAndUpdate(
      idPiece,
      { nomPiece, quantite },
      { new: true }
    );
    if (!updatedPiece) {
      return res.status(404).json({ message: 'Pièce de rechange non trouvée' });
    }
    res.status(200).json({ message: 'Pièce de rechange mise à jour avec succès', updatedPiece });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la pièce de rechange', error });
  }
};

// Supprimer une pièce de rechange
export const deletePiece = async (req, res) => {
  try {
    const { idPiece } = req.params;
    const deletedPiece = await PieceRechange.findByIdAndDelete(idPiece);
    if (!deletedPiece) {
      return res.status(404).json({ message: 'Pièce de rechange non trouvée' });
    }
    res.status(200).json({ message: 'Pièce de rechange supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la pièce de rechange', error });
  }
};
