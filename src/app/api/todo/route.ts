import { getAuth } from '@clerk/nextjs/server';

import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

import { prisma } from '~/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { userId: clerkUserId } = getAuth(req);
    const userId = z.string().parse(clerkUserId);

    const todos = await prisma.todo.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(todos);
  } catch (error) {
    return new Response('Could not fetch Todos, please try again later', { status: 500 });
  }
}
