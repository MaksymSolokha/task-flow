import { prisma } from '../lib/prisma';
import { slugify } from '../utils/slug';

export const getWorkspaces = async (userId: string) => {
  const allWorkspaces = await prisma.workspaceMember.findMany({
    where: { userId: userId },
    include: {
      workspace: {
        select: {
          name: true,
          slug: true,
          id: true,
        },
      },
    },
  });

  return allWorkspaces.map((m) => ({
    id: m.workspace.id,
    name: m.workspace.name,
    slug: m.workspace.slug,
    role: m.role,
  }));
};

export const getWorkspaceById = async (workspaceId: string, userId: string) => {
  const member = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: { userId, workspaceId },
    },
    select: {
      role: true,
      workspace: {
        select: { id: true, name: true, slug: true },
      },
    },
  });

  if (!member) {
    return null;
  }

  return {
    id: member.workspace.id,
    name: member.workspace.name,
    slug: member.workspace.slug,
    role: member.role,
  };
};

export const createWorkspace = async (name: string, userId: string) => {
  const slug = slugify(name);

  const workspace = await prisma.$transaction(async (tx) => {
    const created = await tx.workspace.create({
      data: { name, slug },
      select: { id: true, name: true, slug: true },
    });

    await tx.workspaceMember.create({
      data: { userId, workspaceId: created.id, role: 'OWNER' },
    });

    return created;
  });

  return { ...workspace, role: 'OWNER' as const };
};
