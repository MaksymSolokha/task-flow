import { z } from 'zod';

export const newUserSchema = z.object({
  email: z.string().toLowerCase().email('Invalid email'),
  password: z.string().min(8, { error: 'Must be at least 8 characters' }),
  name: z.string().min(2),
});

export const authUserSchema = z.object({
  email: z.email('Invalid email').toLowerCase(),
  password: z.string(),
});

export type NewUserType = z.infer<typeof newUserSchema>;

export type LoginUserType = z.infer<typeof authUserSchema>;
