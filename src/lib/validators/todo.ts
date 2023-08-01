import { z } from 'zod';

export const TodoValidator = z.object({
  title: z.string().min(1, { message: 'Title must be at least 1 character long' }),
  note: z.string().optional(),
  priority: z.string().min(1, { message: 'A priority must be selected' }),
  tags: z.array(z.string()),
  icon: z.string().min(1, { message: 'An icon must be selected' }),
  dueDate: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type TodoCreationRequest = z.infer<typeof TodoValidator>;
