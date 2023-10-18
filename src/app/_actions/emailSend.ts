'use server';
import ContactForm from '@/components/ContactForm';
import { formSchema } from '@/lib/validation';
import { Resend } from 'resend';
import { type z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

type Inputs = z.infer<typeof formSchema>;

export const emailSend = async (input: Inputs) => {
  if (!input.email || !input.name || !input.message) {
    return {
      error: 'All fields are required',
    };
  }

  try {
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'nikolozkopadze@gmail.com',
      subject: `New message from ${input.name}`,
      reply_to: input.email,
      text: input.message,
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
