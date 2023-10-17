import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Github } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

interface pageProps {}

async function AboutPage({}: pageProps) {
  return (
    <div
      className='container flex items-center  h-[70dvh] max-w-2xl flex-col justify-center
      
    '
    >
      <p className='text-xl '>This is a blog about the things I like.</p>
      <p className='text-xl '>More info uppcoming. For now, check out the </p>
      <Link
        href={siteConfig.links.github}
        target='_blank'
        rel='noreferrer'
        className={cn(
          'mt-4',
          buttonVariants({
            size: 'lg',
            variant: 'outline',
          })
        )}
      >
        GitHub
        <Github className='h-4 w-4 ml-2' aria-hidden='true' />
      </Link>
    </div>
  );
}

export default AboutPage;
