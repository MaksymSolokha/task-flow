import express from 'express';
import { authRouter } from './auth.router';
import { workspaceRouter } from './workspace.router';

const router = express.Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

router.use('/auth', authRouter);
router.use('/workspaces', workspaceRouter);

export default router;
