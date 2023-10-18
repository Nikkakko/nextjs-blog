import * as React from 'react';

interface ContactFormProps {
  name: string;
  email: string;
  message: string;
}

const ContactEmail: React.FC<Readonly<ContactFormProps>> = ({
  name,
  email,
  message,
}) => {
  return (
    <div>
      <h1>Contact form submission</h1>
      <p>
        From <strong>{name}</strong> at {email}
      </p>
      <h2>Message:</h2>
      <p>{message}</p>
    </div>
  );
};

export default ContactEmail;
