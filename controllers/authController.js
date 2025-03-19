import { Utilisateur } from '../models/user.js';
import { generateAuthTokens } from '../controllers/token.js';
import { generateExpires, encryptData, decryptData, setCookie } from '../utils/auth.js';
import config from '../config/config.js';

/**
 * Fonction pour enregistrer un nouvel utilisateur.
 * @param {Object} req - La requête contenant les données d'inscription.
 * @param {Object} res - La réponse qui sera envoyée.
 * @returns {void}
 */
export async function register(req, res) {
  const { nom, prenom, email, motDePasse, role } = req.body;

  try {
    // Vérifier si l'email est déjà pris
    const utilisateurExist = await Utilisateur.findOne({ email });
    if (utilisateurExist) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hacher le mot de passe
    const hashedPassword = await encryptData(motDePasse);

    // Créer un nouvel utilisateur
    const utilisateur = new Utilisateur({
      nom,
      prenom,
      email,
      motDePasse: hashedPassword,
      role,
    });

    // Sauvegarder l'utilisateur dans la base de données
    await utilisateur.save();

    // Générer les tokens d'authentification
    const tokens = await generateAuthTokens({ userId: utilisateur._id, roleId: utilisateur.role });

    // Enregistrer le refreshToken dans l'utilisateur
    utilisateur.refreshToken = tokens.refreshToken.token;
    await utilisateur.save();

    // Enregistrer le refreshToken dans un cookie
    const cookieExpires = generateExpires(config.cookie.expirationHours, 'hours');
    setCookie(res, 'jwt', tokens.refreshToken.token, cookieExpires);

    // Renvoyer les tokens et les informations de l'utilisateur
    return res.status(201).json({
      message: 'Utilisateur enregistré avec succès.',
      utilisateur: {
        id: utilisateur._id,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        role: utilisateur.role,
      },
      tokens,
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur:", error.message);
    return res.status(500).json({ message: 'Erreur serveur lors de l\'enregistrement.' });
  }
}

/**
 * Fonction pour connecter un utilisateur et générer Access Token et Refresh Token.
 * @param {Object} req - La requête contenant les informations de connexion.
 * @param {Object} res - La réponse qui sera envoyée.
 * @returns {void}
 */
export async function handleLogin(req, res) {
  const { email, motDePasse } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Comparer le mot de passe
    const isPasswordValid = await decryptData(motDePasse, utilisateur.motDePasse);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    // Générer les tokens d'authentification
    const tokens = await generateAuthTokens({ userId: utilisateur._id, roleId: utilisateur.role });

    // Enregistrer le refreshToken dans l'utilisateur
    utilisateur.refreshToken = tokens.refreshToken.token;
    await utilisateur.save();

    // Enregistrer le refreshToken dans un cookie
    const cookieExpires = generateExpires(config.cookie.expirationHours, 'hours');
    setCookie(res, 'jwt', tokens.refreshToken.token, cookieExpires);


    // Renvoyer les tokens et les informations de l'utilisateur
    return res.status(200).json({
      message: 'Connexion réussie.',
      utilisateur: {
        id: utilisateur._id,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        role: utilisateur.role,
      },
      tokens,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur:", error.message);
    return res.status(500).json({ message: 'Erreur serveur lors de la connexion.' });
  }
}
