'use client';
import { MainNavItem } from '@/types';
import * as React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Button, buttonVariants } from '../ui/button';
import { useSelectedLayoutSegment, usePathname } from 'next/navigation';
import { ViewVerticalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ModeToggle } from '../theme-toggle';
import Image from 'next/image';
import { devBlogLogo } from 'public/assets';
interface MobileNavProps {
  items: MainNavItem[];
}

const MobileNav: React.FC<MobileNavProps> = ({ items }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const segment = useSelectedLayoutSegment();

  const pathname = usePathname();

  return (
    <div
      className='
      flex items-center justify-between w-full
      lg:hidden
    '
    >
      <Link href='/'>
        <div className='flex items-center space-x-2'>
          {/* <Image alt='Dev Blog Logo' src={devBlogLogo} width={50} height={50} /> */}
          <div className='flex flex-col'>
            <span className='text-sm font-bold'>Dev Space</span>
            <span className='text-xs text-muted-foreground'>
              By Dev, For Devs
            </span>
          </div>
        </div>
      </Link>

      <div className='flex items-center space-x-2'>
        <Sheet open={isOpen} onOpenChange={setIsOpen} modal defaultOpen={true}>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              className='mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden'
            >
              <ViewVerticalIcon className='h-6 w-6' aria-hidden='true' />
              <span className='sr-only'>Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetPortal>
            <SheetOverlay />
          </SheetPortal>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetClose />
            </SheetHeader>
            <SheetDescription>By Dev, For Devs</SheetDescription>
            <nav className='flex items-start flex-col space-y-4 mt-6'>
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
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div className='mt-8 justify-between flex'>
              <Link
                className={cn(
                  'relative',
                  buttonVariants({
                    variant: 'outline',
                    size: 'default',
                  })
                )}
                href='mailto:nikolozkopadze@gmail.com'
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
            </div>
          </SheetContent>
        </Sheet>
        <ModeToggle />
      </div>
    </div>
  );
};

export default MobileNav;
