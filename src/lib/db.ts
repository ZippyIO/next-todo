import { PrismaClient } from '@prisma/client';
import 'server-only';

export const prisma = new PrismaClient();

export default async function prismaExample() {
  const newUser = await prisma.user.create({
    data: {
      userId: '123',
    },
  });

  const users = await prisma.user.findMany();

  return { newUser, users };
}
