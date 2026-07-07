import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export type CreateWorkspaceType = z.infer<typeof createWorkspaceSchema>;
