import * as React from 'react';
import { currentUser } from '@clerk/nextjs';
import SiteHeader from '@/components/layout/SiteHeader';

interface layoutProps {
  children: React.ReactNode;
}

async function LobbyLayout({ children }: layoutProps) {
  const user = await currentUser();
  return (
    <div className='relative flex min-h-screen flex-col'>
      <SiteHeader user={user} />
      <main className='flex-grow'>{children}</main>
      {/* <SiteFooter /> */}
    </div>
  );
}

export default LobbyLayout;
