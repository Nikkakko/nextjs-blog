'use client';
import * as React from 'react';
import { MainNavItem } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from '../theme-toggle';
import { cn } from '@/lib/utils';

import { usePathname } from 'next/navigation';
import { buttonVariants } from '../ui/button';
import SearchBox from '../SearchBox';
interface MainNavProps {
  items: MainNavItem[];
}

const MainNav: React.FC<MainNavProps> = ({ items }) => {
  const pathname = usePathname();
  return (
    <div className='hidden gap-6 lg:flex lg:justify-between lg:w-full'>
      <Link href='/'>
        <div className='flex items-center space-x-2'>
          {/* <Image alt='Dev Blog Logo' src={devBlogLogo} width={50} height={50} /> */}
          <div className='flex flex-col'>
            <span className='text-xl font-bold'>Dev Space</span>
            <span className='text-xs text-muted-foreground'>
              By Dev, For Devs
            </span>
          </div>
        </div>
      </Link>

      <nav className='flex items-center space-x-6'>
        <SearchBox />
        {items.map(item => {
          const isActive = item.href === pathname;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn('text-lg font-medium  ')}
            >
              <div className='group relative  '>
                {item.name}
                {isActive ? (
                  <span className='absolute bottom-0 left-0 w-full h-0.5  bg-gradient-to-r from-indigo-500' />
                ) : (
                  <span className='absolute bottom-0 left-0 w-0 h-0.5  bg-gradient-to-r from-cyan-500  group-hover:w-full hover:transition-all duration-75' />
                )}
              </div>
            </Link>
          );
        })}
        <div className='flex items-center space-x-2'>
          <Link
            className={cn(
              'relative',
              buttonVariants({
                variant: 'default',
                size: 'default',
              })
            )}
            href='/contact'
          >
            <span
              className='
                absolute top-0 right-0 -mt-1 -ml-1 w-3 h-3 rounded-full bg-purple-500 animate-ping
            '
            />
            <span
              className='
                absolute top-0 right-0 -mt-1 -ml-1 w-3 h-3 rounded-full bg-purple-500 opacity-75
            '
            />
            Hire Me
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
};

export default MainNav;
