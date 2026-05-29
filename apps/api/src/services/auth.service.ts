import * as crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { AppError } from '../lib/error';
import { prisma } from '../lib/prisma';
import type { authUser } from '../schemas/auth.schema';

const AVATAR_COLORS = [
  'bg-violet-500',
  'bg-blue-500',
  'bg-emerald-500',
  'bg-orange-500',
  'bg-pink-500',
];

export const createAuthUser = async ({ name, password, email }: authUser) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError(409, 'Email already in use');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const avatarColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  const slug = crypto.randomUUID() + name;
  const user = await prisma.$transaction(async (tx) => {
    const created = await tx.user.create({
      data: { email, name, passwordHash, avatarColor },
      select: { id: true, email: true, name: true, avatarColor: true, createdAt: true },
    });

    const workspace = await tx.workspace.create({
      data: { name: `${name}'s Workspace`, slug },
    });

    await tx.workspaceMember.create({
      data: { userId: created.id, workspaceId: workspace.id, role: 'OWNER' },
    });

    return created;
  });

  return user;
};
