import Link from 'next/link';
import * as React from 'react';
import { AspectRatio } from './ui/aspect-ratio';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

interface HomeScreenProps {
  blog: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ blog }) => {
  return (
    <article className=''>
      <span
        className='text-2xl font-bold uppercase drop-shadow-textpurple
        text-center block mb-2 lg:mb-8 md:text-4xl md:text-start lg:text-5xl'
      >
        Empowered by Next.js
      </span>
      <div className='relative w-full flex-1 group overflow-hidden border border-gray-400 rounded-md '>
        <Link href={blog.slug}>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={blog?.image}
              alt={blog?.title}
              priority
              className='object-cover '
              fill
              sizes='(max-width: 640px) 80vw, (max-width:1180px) 70vw ,50vw'
            />
          </AspectRatio>
        </Link>

        <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent'>
          <div className='flex flex-col md:space-y-2'>
            <p className='text-sm md:text-xl lg:text-2xl font-medium text-white'>
              {blog.title}
            </p>
            <p
              className='text-xs text-gray-400 
          md:text-sm lg:text-base
        '
            >
              {formatDate(blog.publishedAt)}
            </p>
          </div>
        </div>
        <div
          className=' hidden md:flex ease absolute right-0 top-0   h-full w-16  flex-1  flex-col justify-between bg-background p-8 text-base backdrop-blur-sm   transition-all duration-500 group-hover:w-[30%] group-hover:bg-background group-hover:p-6 
    '
        >
          <div className='flex w-full flex-col items-center justify-between'>
            <div className='ease flex w-full translate-y-[10rem]  rotate-[-90deg]  items-center transition-all duration-300 group-hover:translate-y-[0] group-hover:rotate-[0] sxl:translate-y-0 sxl:rotate-0 '>
              <span className='mr-2'>Author</span>
              <span className='font-medium text-gray-500 hover:text-gray-600 transition-colors duration-200 ease-in-out'>
                {blog.author}
              </span>
            </div>
            <div className='my-4 w-full overflow-hidden font-normal leading-relaxed md:text-sm'>
              <p>
                Used by some of the world's largest companies, Next.js enables
                you to create full-stack Web applications by extending the
                latest React features, and integrating powerful Rust-based
                JavaScript tooling for the fastest builds.
              </p>
            </div>
          </div>
          <Link href={blog.slug}>
            <div
              className='
        bg-black/50 rounded-full
        flex items-center justify-between
        p-2
        cursor-pointer
      '
            >
              <span className='text-sm font-medium text-gray-500 hover:text-gray-600 transition-colors duration-200 ease-in-out hidden group-hover:block'>
                Read more
              </span>
              <ArrowLeft className='w-4 h-4 text-gray-500 hover:text-gray-600 transition-colors duration-200 ease-in-out' />
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default HomeScreen;
