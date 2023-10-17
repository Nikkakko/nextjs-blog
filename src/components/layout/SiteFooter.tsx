import { cn } from '@/lib/utils';
import Link from 'next/link';
import * as React from 'react';
import { buttonVariants } from '../ui/button';
import { siteConfig } from '@/config/site';
import { Github } from 'lucide-react';

interface SiteFooterProps {}

const SiteFooter: React.FC<SiteFooterProps> = ({}) => {
  return (
    <footer className='w-full  bg-background container'>
      <section className='py-12 flex flex-col justify-between space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-center'>
        <div className='flex items-center space-x-1  '>
          <span className='text-gray-400'>
            © {new Date().getFullYear()}
            All rights reserved.
          </span>
        </div>
        <div className='flex items-center space-x-1'>
          <Link
            href={siteConfig.links.github}
            target='_blank'
            rel='noreferrer'
            className={cn(
              buttonVariants({
                size: 'lg',
                variant: 'outline',
              })
            )}
          >
            View on GitHub
            <Github className='h-4 w-4 ml-2' aria-hidden='true' />
          </Link>
        </div>
      </section>
    </footer>
  );
};

export default SiteFooter;
