import express from 'express';
import {
  createWorkspace,
  getMyWorkspaces,
  workspaceById,
} from '../controllers/workspace.controller';
import { requireAuth } from '../middleware/requireAuth';

const workspaceRouter = express.Router();

workspaceRouter.get('/', requireAuth, getMyWorkspaces);
workspaceRouter.post('/', requireAuth, createWorkspace);

workspaceRouter.get('/:id', requireAuth, workspaceById);

export { workspaceRouter };
