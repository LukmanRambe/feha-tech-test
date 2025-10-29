import { Router } from 'express';
import { signin, signUp } from '../controllers/auth.controller';

const router = Router();

// POST /api/auth/signup
router.post('/signup', signUp);

// POST /api/auth/signin
router.post('/signin', signin);

export default router;
