import * as React from 'react';

import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';

interface layoutProps {
  children: React.ReactNode;
}

async function LobbyLayout({ children }: layoutProps) {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <SiteHeader />
      <main className='flex-1 container'>{children}</main>
      <SiteFooter />
    </div>
  );
}

export default LobbyLayout;
