import { z } from 'zod';

export const TodoValidator = z.object({
  title: z.string().min(1, { message: 'Title must be at least 1 character long' }),
  date: z.coerce.date(),
  note: z.string().optional(),
});

export type TodoCreationRequest = z.infer<typeof TodoValidator>;
