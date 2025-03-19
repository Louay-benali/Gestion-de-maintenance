import dotenv from 'dotenv';
import Joi from 'joi';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Définition du schéma de validation des variables d'environnement
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  PORT: Joi.number().default(3000),

  MONGODB_URI: Joi.string().uri().required().description('MongoDB URI'),

  JWT_SECRET: Joi.string().required().description('JWT secret key'),
  JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(5).description('Minutes après lesquelles les tokens d\'accès expirent'),
  JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(1).description('Jours après lesquels les tokens de rafraîchissement expirent'),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(1440).description('Minutes après lesquelles le token de réinitialisation du mot de passe expire'),

  COOKIE_EXPIRATION_HOURS: Joi.number().default(24).description('Durée d\'expiration des cookies en heures'),
}).unknown();

// Validation des variables d'environnement
const { value: envVars, error } = envVarsSchema.validate(process.env, { abortEarly: false });

if (error) {
  throw new Error(`Erreur de validation des variables d'environnement: ${error.message}`);
}

// Exporter la configuration
const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoUri: envVars.MONGODB_URI,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: Number(envVars.JWT_ACCESS_EXPIRATION_MINUTES),
    refreshExpirationDays: Number(envVars.JWT_REFRESH_EXPIRATION_DAYS),
    resetPasswordExpirationMinutes: Number(envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES),
  },
  cookie: {
    expirationHours: parseInt(process.env.COOKIE_EXPIRATION_HOURS, 10),
  },
};

export default config;
