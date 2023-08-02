import { z } from 'zod';

export const ClerkUserIdValidator = z.object({
  userId: z.string().min(1),
});
