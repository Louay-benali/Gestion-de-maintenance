import express from 'express';
import { register, handleLogin } from '../controllers/authController.js';
import { refreshTokenController } from '../controllers/refreshController.js'; 
import { authorize } from '../middleware/auth.js';


const router = express.Router();

// Routes publiques
router.post('/register', register);
router.post('/login', handleLogin);


router.post('/refresh-token', refreshTokenController); 

export default router; 