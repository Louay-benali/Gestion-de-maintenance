import { Utilisateur } from '../models/user.js';


/**
 * Fonction pour gérer la déconnexion d'un utilisateur.
 * @param {Object} req - La requête contenant les cookies.
 * @param {Object} res - La réponse qui sera envoyée.
 * @returns {void}
 */
export async function handleLogout(req, res) {
  try {
    // Vérifier si le refreshToken est présent dans les cookies
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.sendStatus(204); // No Content
    }

    const refreshToken = cookies.jwt;

    // Rechercher l'utilisateur avec ce refreshToken
    const utilisateur = await Utilisateur.findOne({ refreshToken });
    if (!utilisateur) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      return res.sendStatus(204);
    }

    // Supprimer le refreshToken de l'utilisateur
    utilisateur.refreshToken = '';
    await utilisateur.save();

    // Supprimer le cookie côté client
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    
    return res.sendStatus(204);
  } catch (error) {
    console.error("Erreur lors de la déconnexion de l'utilisateur:", error.message);
    return res.status(500).json({ message: "Erreur serveur lors de la déconnexion." });
  }
}
