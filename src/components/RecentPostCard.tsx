import { cn, formatDate } from '@/lib/utils';
import Image from 'next/image';
import { buttonVariants } from './ui/button';

import * as React from 'react';
import { Post } from 'contentlayer/generated';
import { AspectRatio } from './ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import Link from 'next/link';

const RecentPostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Link href={`/blogs/${post.slugAsParams}`}>
      <Card
        className='bg-muted-foreground/20 rounded-md p-4 flex flex-col md:flex-row gap-4
    border border-solid border-muted-foreground/20
    '
      >
        <div className='relative w-full flex flex-1   aspect-[500/300]'>
          <Image
            src={post.image}
            alt='Image'
            fill
            className='rounded-md object-cover'
          />
        </div>

        <CardContent className='flex flex-col justify-center flex-1 px-0'>
          <CardHeader className='flex flex-col p-0'>
            <CardTitle className='text-xl font-bold '>{post.title}</CardTitle>
            <CardDescription className=''>{post.description}</CardDescription>
          </CardHeader>

          <CardFooter className='flex flex-row justify-between mt-4 px-0 py-0'>
            <div className='flex flex-col'>
              <p className='text-sm text-muted-foreground'>
                {formatDate(post.publishedAt)}
              </p>
              <p className='text-sm text-muted-foreground'>{post.author}</p>
            </div>

            <p
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                })
              )}
            >
              {post.readingTime && post.readingTime.text}
            </p>
          </CardFooter>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecentPostCard;
