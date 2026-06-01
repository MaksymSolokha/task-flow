import express from 'express';
import {
  getMeController,
  loginController,
  logoutController,
  refreshController,
  registerController,
} from '../controllers/auth.controller';
import { requireAuth } from '../middleware/requireAuth';

const authRouter = express.Router();

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);
authRouter.post('/refresh', refreshController);
authRouter.post('/logout', logoutController);
authRouter.get('/me', requireAuth, getMeController);

export { authRouter };
