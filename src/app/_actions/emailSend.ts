'use server';

import { formSchema } from '@/lib/validation';
import { Resend } from 'resend';

import { type z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailSend = async (input: z.infer<typeof formSchema>) => {
  if (!input.email || !input.name || !input.message) {
    return {
      error: 'All fields are required',
    };
  }

  try {
    resend.emails.send({
      from: input.email,
      to: 'nikolozkopadze@gmail.com',
      subject: `New message from ${input.name}`,
      text: input.message,
    });
  } catch (error) {
    console.log(error);
  }
};
