import type { NextFunction, Request, Response } from 'express';
import { userAuthSchema } from '../schemas/auth.schema';
import { createAuthUser } from '../services/auth.service';

async function registerController(req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body;
  try {
    const validateUser = userAuthSchema.parse({ name, email, password });
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

export { registerController };
