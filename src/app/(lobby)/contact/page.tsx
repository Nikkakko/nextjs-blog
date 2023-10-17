import ContactForm from '@/components/ContactForm';

interface ContactPageProps {}

async function ContactPage({}: ContactPageProps) {
  return (
    <div className='container flex items-center  h-[100dvh] max-w-2xl flex-col justify-center'>
      <ContactForm />
    </div>
  );
}

export default ContactPage;
