import { Utilisateur } from '../models/user.js';
import { generateAuthTokens } from '../controllers/token.js';
import { encryptData, decryptData } from '../utils/auth.js';
import { sendApprovalCode } from "../services/email.service.js";
import config from '../config/config.js';
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import logger from '../utils/logger.js';

/**
 * Enregistrer un nouvel utilisateur.
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientId,
      clientSecret: config.google.clientSecret,
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    async (token, tokenSecret, profile, done) => {
      try {
        // Recherche d’un utilisateur existant avec ce Google ID
        let utilisateur = await Utilisateur.findOne({ email: profile.emails[0].value });

        if (!utilisateur) {
          // Si l'utilisateur n'existe pas, on le crée
          utilisateur = new Utilisateur({
            nom: profile.name.familyName ,
            prenom: profile.name.givenName ,
            email: profile.emails[0].value,
            motDePasse: "00112233@Ab", // mot de passe temporaire (sera hashé automatiquement avec le pre-save)
            role: "operateur", // ou un autre rôle par défaut
            isApproved: true, 
          });

          await utilisateur.save();
        }

        return done(null, utilisateur);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
// Sérialisation de l’utilisateur (stockage en session)
passport.serializeUser((utilisateur, done) => {
  done(null, utilisateur.id);
});

// Désérialisation (récupération de l'utilisateur via l'ID stocké)
passport.deserializeUser(async (id, done) => {
  try {
    const utilisateur = await Utilisateur.findById(id);
    done(null, utilisateur);
  } catch (err) {
    done(err, null);
  }
});

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    async (err, user) => {
      if (err) {
        console.error("Erreur lors de l'authentification Google :", err);
        return res.status(500).send({ message: "Échec de l'authentification" });
      }

      if (!user) {
        return res.redirect("/login");
      }

      try {
        // Générer les tokens d'accès (par exemple JWT)
        const tokens = await generateAuthTokens({
          userId: user._id,
          role: user.role,
        });


      return res.status(200).json({ utilisateur: user, tokens });

      } catch (tokenError) {
        console.error("Erreur lors de la génération des tokens :", tokenError);
        return res.status(500).send({ message: "Erreur lors de la génération des tokens" });
      }
    }
  )(req, res, next);
};

export async function register(req, res) {
  const { nom, prenom, email, motDePasse, role } = req.body;

  try {
    const utilisateurExist = await Utilisateur.findOne({ email });
    if (utilisateurExist) {
      logger.warn(`[REGISTER] Tentative d'inscription avec email existant: ${email}`);
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await encryptData(motDePasse);

    // 🔐 Génération du code d'approbation
    const approvalCode = Math.floor(100000 + Math.random() * 900000).toString();

    const utilisateur = new Utilisateur({
      nom,
      prenom,
      email,
      motDePasse: hashedPassword,
      role,
      approvalCode,
      isApproved: false,
    });

    await utilisateur.save();

    // 📧 Envoi de l'e-mail
    await sendApprovalCode(email, approvalCode);
    logger.info(`[REGISTER] Utilisateur enregistré: ${email}, code d'approbation envoyé.`);

    return res.status(201).json({
      message: "Utilisateur enregistré. Code d'approbation envoyé par e-mail.",
      utilisateur: {
        id: utilisateur._id,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        role: utilisateur.role,
      },
    });
  } catch (error) {
    logger.error(`[REGISTER] Erreur serveur: ${error.message}`);
    return res.status(500).json({ message: "Erreur serveur lors de l'enregistrement." });
  }
}

/**
 * Connexion utilisateur.
 */
export async function handleLogin(req, res) {
  const { email, motDePasse } = req.body;

  try {
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
      logger.warn(`[LOGIN] Utilisateur non trouvé: ${email}`);
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const isPasswordValid = await decryptData(motDePasse, utilisateur.motDePasse);
    if (!isPasswordValid) {
      logger.warn(`[LOGIN] Mot de passe incorrect pour l'email: ${email}`);
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    const tokens = await generateAuthTokens({ userId: utilisateur._id, roleId: utilisateur.role });

    utilisateur.refreshToken = tokens.refreshToken.token;
    await utilisateur.save();

    logger.info(`[LOGIN] Connexion réussie: ${email}`);

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
    logger.error(`[LOGIN] Erreur serveur: ${error.message}`);
    return res.status(500).json({ message: 'Erreur serveur lors de la connexion.' });
  }
}

export const signInUsingToken = async (req, res, next) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Access token is required");
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    } catch (error) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Invalid or expired access token"
      );
    }

    const user = await User.findById(decodedToken.sub);

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
    }

    const tokens = await generateAuthTokens({
      userId: user.id,
      roleId: user.role_id,
    });

    res.status(200).send({ user, tokens });
  } catch (error) {
    next(error);
  }
};