import express from 'express';
import { authRouter } from './auth.router';

const router = express.Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

router.use('/auth', authRouter);

export default router;
