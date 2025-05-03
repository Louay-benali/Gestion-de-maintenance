// controllers/pieceController.js
import PieceRechange from "../models/piece.js";
import logger from "../utils/logger.js";

// Créer une nouvelle pièce de rechange
export const createPiece = async (req, res) => {
  try {
    const { nomPiece, quantite } = req.body;
    const newPiece = new PieceRechange({ nomPiece, quantite });
    await newPiece.save();

    logger.info(
      `[PIECE] Nouvelle pièce créée : ${nomPiece} (Quantité: ${quantite})`
    );
    res
      .status(201)
      .json({ message: "Pièce créée avec succès", piece: newPiece });
  } catch (error) {
    logger.error(`[PIECE] Erreur création pièce : ${error.message}`);
    res.status(400).json({
      message: "Erreur lors de la création de la pièce de rechange",
      error,
    });
  }
};

// Obtenir toutes les pièces de rechange avec pagination
export const getPieces = async (req, res) => {
  try {
    // 1. Lire les paramètres de pagination (ou mettre des valeurs par défaut)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // 2. Récupérer les pièces avec pagination
    const pieces = await PieceRechange.find().skip(skip).limit(limit);

    // 3. Compter le nombre total de pièces
    const totalPieces = await PieceRechange.countDocuments();

    // 4. Répondre avec les données paginées + infos
    res.status(200).json({
      results: pieces,
      totalPieces,
      totalPages: Math.ceil(totalPieces / limit),
      page,
      limit,
    });

    logger.info(
      `[PIECE] Récupération de toutes les pièces (${pieces.length}) avec pagination`
    );
  } catch (error) {
    logger.error(`[PIECE] Erreur récupération pièces : ${error.message}`);
    res.status(500).json({
      message: "Erreur lors de la récupération des pièces de rechange",
      error,
    });
  }
};

// Obtenir une pièce de rechange par ID
export const getPieceById = async (req, res) => {
  try {
    const { idPiece } = req.params;
    const piece = await PieceRechange.findById(idPiece);
    if (!piece) {
      logger.warn(`[PIECE] Pièce non trouvée pour ID : ${idPiece}`);
      return res.status(404).json({ message: "Pièce de rechange non trouvée" });
    }
    logger.info(`[PIECE] Pièce trouvée : ${piece.nomPiece}`);
    res.status(200).json(piece);
  } catch (error) {
    logger.error(
      `[PIECE] Erreur récupération pièce ID ${req.params.idPiece} : ${error.message}`
    );
    res.status(500).json({
      message: "Erreur lors de la récupération de la pièce de rechange",
      error,
    });
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
      logger.warn(
        `[PIECE] Mise à jour échouée, pièce non trouvée : ID ${idPiece}`
      );
      return res.status(404).json({ message: "Pièce de rechange non trouvée" });
    }
    logger.info(
      `[PIECE] Pièce mise à jour : ${updatedPiece.nomPiece} (Quantité: ${updatedPiece.quantite})`
    );
    res
      .status(200)
      .json({ message: "Mise à jour réussie", piece: updatedPiece });
  } catch (error) {
    logger.error(
      `[PIECE] Erreur mise à jour pièce ID ${req.params.idPiece} : ${error.message}`
    );
    res.status(400).json({
      message: "Erreur lors de la mise à jour de la pièce de rechange",
      error,
    });
  }
};

// Supprimer une pièce de rechange
export const deletePiece = async (req, res) => {
  try {
    const { idPiece } = req.params;
    const deletedPiece = await PieceRechange.findByIdAndDelete(idPiece);
    if (!deletedPiece) {
      logger.warn(
        `[PIECE] Suppression échouée, pièce non trouvée : ID ${idPiece}`
      );
      return res.status(404).json({ message: "Pièce de rechange non trouvée" });
    }
    logger.info(`[PIECE] Pièce supprimée : ${deletedPiece.nomPiece}`);
    res.status(200).json({ message: "Pièce supprimée avec succès" });
  } catch (error) {
    logger.error(
      `[PIECE] Erreur suppression pièce ID ${req.params.idPiece} : ${error.message}`
    );
    res.status(500).json({
      message: "Erreur lors de la suppression de la pièce de rechange",
      error,
    });
  }
};

// Identifier les pièces les plus utilisées avec pagination
export const getMostUsedPieces = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Agrégation pour identifier les pièces les plus utilisées avec pagination
    const mostUsedPieces = await PieceRechange.aggregate([
      {
        $project: {
          nomPiece: 1,
          quantite: 1,
        },
      },
      { $sort: { quantite: -1 } }, // Trier par quantité croissante (les plus utilisées)
      { $skip: skip }, // Sauter les documents pour la pagination
      { $limit: limit }, // Limiter le nombre de résultats
    ]);

    const totalPieces = await PieceRechange.countDocuments();

    res.status(200).json({
      results: mostUsedPieces,
      totalPieces,
      totalPages: Math.ceil(totalPieces / limit),
      page,
      limit,
    });

    logger.info(
      `[PIECE] Récupération des pièces les plus utilisées (${mostUsedPieces.length}) avec pagination`
    );
  } catch (error) {
    logger.error(
      `[PIECE] Erreur récupération des pièces les plus utilisées : ${error.message}`
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des pièces les plus utilisées",
      error,
    });
  }
};
