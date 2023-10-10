import { cn } from '@/lib/utils';
import Link from 'next/link';
import * as React from 'react';
import { buttonVariants } from './ui/button';

interface CategoriesBarProps {
  categories: string[];
  title: string;
}

const CategoriesBar: React.FC<CategoriesBarProps> = ({ categories, title }) => {
  return (
    <article className='mt-8'>
      <h1
        className='text-2xl font-bold text-center mb-8 border-b-4 border-solid uppercase
      border-purple-500/50  w-max
        md:text-3xl
        lg:text-4xl
      '
      >
        {title}
      </h1>
      <div className='bg-muted-foreground/20 rounded-md p-4'>
        <div
          className='flex items-center overflow-x-auto
        scrollbar-thin scrollbar-track-background scrollbar-thumb-purple-500/50
      '
        >
          {categories.map((category, index) => (
            <div className='fle items-center mb-2'>
              <Link
                href={`/blogs/category/${category.toLowerCase()}`}
                className={cn(
                  'mr-2',
                  buttonVariants({
                    variant: 'default',
                    size: 'lg',
                    className: `py-12
                        transition-all
                        duration-500
                        ease-in-out
                        transform translate-y-0 hover:-translate-y-1
                        rotate-0 hover:rotate-3
                        
                    `,
                  })
                )}
              >
                <h2 className='inline-block text-center w-max'>{category}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default CategoriesBar;
