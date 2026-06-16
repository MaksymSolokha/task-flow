import express from 'express';
import { createWorkspace, getMyWorkspaces } from '../controllers/workspace.controller';
import { requireAuth } from '../middleware/requireAuth';

const workspaceRouter = express.Router();

workspaceRouter.get('/', requireAuth, getMyWorkspaces);
workspaceRouter.post('/', requireAuth, createWorkspace);

export { workspaceRouter };
