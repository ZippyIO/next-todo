import { PrismaClient } from '@prisma/client';
import 'server-only';

export const prisma = new PrismaClient();
