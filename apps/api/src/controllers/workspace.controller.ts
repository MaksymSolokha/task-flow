import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../lib/error';
import { createWorkspaceSchema } from '../schemas/workspaceSchema';
import {
  createWorkspace as createWorkspaceService,
  getWorkspaceById,
  getWorkspaces,
} from '../services/workspaces.service';

async function getMyWorkspaces(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user?.userId) {
      throw new AppError(401, 'Not logged in');
    }
    const { userId } = req.user;
    const myWorkspaces = await getWorkspaces(userId);
    res.status(200).json({ workspaces: myWorkspaces });
  } catch (err) {
    next(err);
  }
}

async function createWorkspace(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user?.userId) {
      throw new AppError(401, 'Not logged in');
    }
    const { userId } = req.user;

    const { name } = createWorkspaceSchema.parse(req.body);

    const workspace = await createWorkspaceService(name, userId);

    res.status(201).json({ workspace });
  } catch (err) {
    next(err);
  }
}

async function workspaceById(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user?.userId) {
      throw new AppError(401, 'Not logged in');
    }
    const { userId } = req.user;

    const workspaceId = req.params.id;
    if (typeof workspaceId !== 'string') {
      throw new AppError(400, 'Invalid workspace id');
    }

    const workspace = await getWorkspaceById(workspaceId, userId);

    if (!workspace) {
      throw new AppError(404, 'Workspace not found');
    }

    res.status(200).json({ workspace });
  } catch (err) {
    next(err);
  }
}

export { createWorkspace, getMyWorkspaces, workspaceById };
