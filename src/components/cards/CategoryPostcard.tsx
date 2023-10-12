'use client';
import { Post } from 'contentlayer/generated';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

interface CategoryPostcardProps {
  post: Post;
}

const CategoryPostcard: React.FC<CategoryPostcardProps> = ({ post }) => {
  return (
    <Link href={`/blogs/${post.slugAsParams}`}>
      <Card className='bg-muted-foreground/20 rounded-md  flex flex-col  gap-4 border border-solid border-muted-foreground/20'>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className='rounded-md object-cover'
          />
        </AspectRatio>

        <CardContent className='flex flex-col justify-center flex-1 p-2'>
          <CardHeader className='flex flex-col p-0'>
            <CardTitle className='text-xl font-bold '>{post.title}</CardTitle>
            <CardDescription>{post.description}</CardDescription>
          </CardHeader>

          <CardFooter className='flex flex-row justify-between mt-4 px-0 py-0'>
            <div className='flex flex-col'>
              <p className='text-sm text-muted-foreground'>
                {formatDate(post.publishedAt)}
              </p>
              <p className='text-sm text-muted-foreground'>{post.author}</p>
            </div>

            <p className='bg-purple-500 text-white px-3 py-1 rounded-md'>
              {post.readingTime && post.readingTime.text}
            </p>
          </CardFooter>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryPostcard;
