import type { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../lib/error';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../lib/jwt';
import { authUserSchema, newUserSchema } from '../schemas/authUserSchema';
import { createAuthUser, loginAuthUser } from '../services/auth.service';

async function registerController(req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body;
  try {
    const validateUser = newUserSchema.parse({ name, email, password });
    const user = await createAuthUser({
      name: validateUser.name,
      email: validateUser.email,
      password: validateUser.password,
    });
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
}

async function loginController(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const validatedUser = authUserSchema.parse({ email, password });
    const { user, refreshToken, accessToken } = await loginAuthUser({
      email: validatedUser.email,
      password: validatedUser.password,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user, accessToken });
  } catch (error) {
    next(error);
  }
}

async function refreshController(req: Request, res: Response, next: NextFunction) {
  try {
    const cookieRefreshToken = req.cookies['refreshToken'];
    if (!cookieRefreshToken) {
      throw new AppError(401, 'No refresh token');
    }

    const payload = verifyRefreshToken(cookieRefreshToken);
    if (typeof payload === 'string' || !payload.userId) {
      throw new AppError(401, 'Invalid token payload');
    }

    const accessToken = generateAccessToken({ userId: payload.userId });
    return res.status(200).json({ accessToken });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new AppError(401, 'Invalid refresh token'));
    }
    next(err);
  }
}

async function logoutController(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

async function getMeController(req: Request, res: Response, next: NextFunction) {
  try {
    const me = req.user;
    if (!me) {
      throw new AppError(401, 'No user with this user');
    }
    res.status(200).json({ me });
  } catch (err) {
    next(err);
  }
}

export {
  getMeController,
  loginController,
  logoutController,
  refreshController,
  registerController,
};
