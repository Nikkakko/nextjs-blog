'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { formSchema } from '@/lib/validation';
import { Textarea } from './ui/textarea';
import { Send } from 'lucide-react';
import { emailSend } from '@/app/_actions/emailSend';
import { useToast } from './ui/use-toast';

interface ContactFormProps {}

const ContactForm: React.FC<ContactFormProps> = ({}) => {
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      email: '',
      message: '',
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransition(async () => {
      try {
        const result = await emailSend(values);

        if (result.success) {
          toast({
            title: 'Message sent',
            description: 'Your message was sent successfully.',
            duration: 5000,
          });

          form.reset();
        }
      } catch (error) {
        toast({
          title: 'Message failed',
          description: 'Your message failed to send.',

          duration: 5000,
        });
      }
    });
  }
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Contact Me</CardTitle>
        <CardDescription>Send me a message.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='john doe' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='example@gmail.com' {...field} />
                  </FormControl>
                  <FormDescription>This is your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Tell us a little bit about yourself'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Contact me about anything.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={isPending}>
              <Send className='h-4 w-4 mr-2' aria-hidden='true' />
              Send
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
