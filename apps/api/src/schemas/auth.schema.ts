import { z } from 'zod';

export const userAuthSchema = z.object({
  email: z.string().toLowerCase().email('Invalid email'),
  password: z.string().min(8, { error: 'Must be at least 8 characters' }),
  name: z.string().min(2),
});

export type authUser = z.infer<typeof userAuthSchema>;
