import { Post } from 'contentlayer/generated';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Arrow } from '@radix-ui/react-tooltip';
import { ArrowRight } from 'lucide-react';

interface FeaturedPostsProps {
  featuredPosts: Post[];
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ featuredPosts }) => {
  return (
    <section className='grid grid-cols-1  gap-4'>
      <div className='col-span-2 text-2xl font-bold mt-4 drop-shadow-textpurple'>
        Featured Posts
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {featuredPosts.map((post, index) => (
          <Link href={`/blog/${post.slug}`} key={index}>
            <Card className='h-full'>
              <CardHeader>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={300}
                  layout='responsive'
                />
              </CardHeader>
              <CardContent>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription className='text-sm text-muted-foreground mt-2'>
                  {post.description.slice(0, 100) + '...'}
                </CardDescription>
              </CardContent>
              <CardFooter className='flex justify-between items-center'>
                <div className='text-sm text-muted-foreground'>
                  {formatDate(post.publishedAt)}
                </div>
                <div className='w-8 h-8 rounded-full flex justify-center items-center cursor-pointer'>
                  <ArrowRight size={16} className='text-card-foreground' />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPosts;
