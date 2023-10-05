import * as React from 'react';
import type { User } from '@clerk/nextjs/server';
import { getUserEmail } from '@/lib/utils';
import MobileNav from './MobileNav';
import MainNav from './MainNav';

interface SiteHeaderProps {
  user: User | null;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ user }) => {
  const initials = `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`;

  const email = getUserEmail(user);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <div className='container flex items-center h-16 '>
        <MainNav />
        {/* <MobileNav /> */}
      </div>
    </header>
  );
};

export default SiteHeader;
