import type { NextFunction, Request, Response } from 'express';
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

export { loginController, registerController };
