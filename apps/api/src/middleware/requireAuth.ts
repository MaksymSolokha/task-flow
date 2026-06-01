import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../lib/error';
import { verifyAccessToken } from '../lib/jwt';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError(401, 'Not logged in');
    }
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw new AppError(401, 'Not logged in');
    }
    const payload = verifyAccessToken(accessToken);
    if (typeof payload === 'string' || !payload.userId) {
      throw new AppError(401, 'Invalid token payload');
    }
    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new AppError(401, 'Invalid token'));
    }
    next(err);
  }
}
