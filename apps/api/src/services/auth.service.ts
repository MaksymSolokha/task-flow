import * as crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { AppError } from '../lib/error';
import { generateAccessToken, generateRefreshToken } from '../lib/jwt';
import { prisma } from '../lib/prisma';
import type { LoginUserType, NewUserType } from '../schemas/authUserSchema';
import { slugify } from '../utils/slug';

const AVATAR_COLORS = [
  'bg-violet-500',
  'bg-blue-500',
  'bg-emerald-500',
  'bg-orange-500',
  'bg-pink-500',
];

export const createAuthUser = async ({ name, password, email }: NewUserType) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError(409, 'Email already in use');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const avatarColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  const slug = slugify(name + "'s Workspace");
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

export const loginAuthUser = async ({ password, email }: LoginUserType) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError(401, 'Invalid credentials');
  }

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isCorrectPassword) {
    throw new AppError(401, 'Invalid credentials');
  }

  const accessToken = generateAccessToken({ userId: user.id });
  const refreshToken = generateRefreshToken({ userId: user.id });
  const { email: userEmail, name, avatarColor, createdAt, id, updatedAt } = user;

  return {
    user: {
      email: userEmail,
      name,
      avatarColor,
      createdAt,
      id,
      updatedAt,
    },
    accessToken,
    refreshToken,
  };
};
