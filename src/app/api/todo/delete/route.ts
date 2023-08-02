import { getAuth } from '@clerk/nextjs/server';

import { type NextRequest } from 'next/server';
import { z } from 'zod';

import { prisma } from '~/lib/db';
import { ClerkUserIdValidator } from '~/lib/validators/clerk';
import { TodoIdValidator } from '~/lib/validators/todo';

export async function DELETE(req: NextRequest) {
  try {
    const { userId: clerkUserId } = getAuth(req);
    const body = await req.json();

    if (!clerkUserId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { userId } = ClerkUserIdValidator.parse({ userId: clerkUserId });
    const { todoId } = TodoIdValidator.parse({ todoId: body.todoId });

    await prisma.todo.delete({
      where: {
        id: todoId,
        userId: userId,
      },
    });

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response('Could not delete Todo, please retry later', { status: 500 });
  }
}
