import { getAuth } from '@clerk/nextjs/server';

import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '~/lib/db';
import { ClerkUserIdValidator } from '~/lib/validators/clerk';

export async function GET(req: NextRequest) {
  try {
    const { userId: clerkUserId } = getAuth(req);

    if (!clerkUserId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { userId } = ClerkUserIdValidator.parse({ userId: clerkUserId });

    const rawTodoTags = await prisma.todo.findMany({
      where: {
        userId: userId,
      },
      select: {
        tags: true,
      },
    });

    const todoTags = [...new Set(rawTodoTags.flatMap((v) => v.tags))];

    return NextResponse.json(todoTags);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response('Could not fetch user Todo tags, please retry later', { status: 500 });
  }
}
