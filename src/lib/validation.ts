import * as z from 'zod';

export const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),

  message: z.string().min(10, {
    message: 'Please enter a message of at least 10 characters',
  }),

  name: z
    .string({
      required_error: 'Please enter your name',
    })
    .min(2, {
      message: 'Please enter a name of at least 2 characters',
    }),
});
