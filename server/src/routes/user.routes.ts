import { Router } from 'express';
import { getUserData, updateUserData } from '../controllers/user.controller';

const router = Router();

// GET /api/user
router.get('/', getUserData);

// PATCH /api/
router.patch('/', updateUserData);

export default router;
