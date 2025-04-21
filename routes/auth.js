import express from 'express';
import { register, handleLogin } from '../controllers/authController.js';
import { refreshTokenController } from '../controllers/refreshController.js'; 
import { handleLogout } from '../controllers/logoutController.js';
import { googleLogin, googleCallback } from "../controllers/authController.js";


const router = express.Router();

// Routes publiques
router.post('/register', register);
router.post('/login', handleLogin);


router.post('/refresh-token', refreshTokenController); 

router.post('/logout', handleLogout);

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

export default router; 