import * as React from 'react';

import MobileNav from './MobileNav';
import MainNav from './MainNav';
import { siteConfig } from '@/config/site';
import SearchBox from '../SearchBox';

interface SiteHeaderProps {}

const SiteHeader: React.FC<SiteHeaderProps> = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <div className='container flex items-center h-16 justify-end lg:justify-normal'>
        <MainNav items={siteConfig.mainNav} />

        <MobileNav items={siteConfig.mainNav} />
      </div>
    </header>
  );
};

export default SiteHeader;
