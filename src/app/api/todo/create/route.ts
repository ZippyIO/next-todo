import { getAuth } from '@clerk/nextjs/server';

import { type NextRequest } from 'next/server';
import { z } from 'zod';

import { prisma } from '~/lib/db';
import { TodoValidator } from '~/lib/validators/todo';

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkUserId } = getAuth(req);
    const body = await req.json();

    const { title, date, note } = TodoValidator.parse({ ...body });
    const userId = z.string().parse(clerkUserId);

    await prisma.todo.create({
      data: {
        title,
        date,
        note,
        userId,
      },
    });

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response('An error occurred creating the Todo, please try later', { status: 500 });
  }
}
