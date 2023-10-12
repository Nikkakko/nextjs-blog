'use client';
import Link from 'next/link';
import * as React from 'react';
import { buttonVariants } from './ui/button';
import { cn, slugify } from '@/lib/utils';

const CategoriesDisplay = ({
  categories,
  currentSlug,
}: {
  categories: string[];
  currentSlug: string;
}) => {
  return (
    <div className='flex flex-col mt-4'>
      <div className='flex flex-wrap gap-4 mt-5'>
        {categories.map((category, index) => {
          const isAcitve = currentSlug === category.toLowerCase();

          return (
            <Link
              href={`/blogs/category/${category.toLowerCase()}`}
              key={index}
              className={cn(
                buttonVariants({
                  variant: 'default',
                  size: 'sm',
                  className: cn('capitalize', {
                    'bg-purple-500 text-white': isAcitve,
                    'bg-white text-background': !isAcitve,
                    'hover:bg-purple-500 hover:text-white': isAcitve,
                    'hover:bg-purple-500/80 hover:text-white': !isAcitve,
                  }),
                })
              )}
            >
              {slugify(category)}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesDisplay;
