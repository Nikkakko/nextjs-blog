import { Post } from 'contentlayer/generated';
import * as React from 'react';
import RecentPostCard from './RecentPostCard';
import TrendingPosts from './TrendingPosts';
import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

interface RecentPostsProps {
  recentPosts: Post[];
  title: string;
}

const RecentPosts: React.FC<RecentPostsProps> = ({ recentPosts, title }) => {
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

      <div className='flex flex-col md:flex-row md:gap-8  relative'>
        <div className='flex  flex-col md:gap-6 gap-4'>
          {recentPosts.map(post => (
            <RecentPostCard key={post.slug} post={post} />
          ))}
          <div className='flex  justify-end'>
            <Link
              href='/blogs/category/all'
              className=' capitalize underline cursor-pointer flex items-center'
            >
              see new more articles
              <LinkIcon className='h-4 w-4 ml-2' aria-hidden='true' />
            </Link>
          </div>
        </div>
        <TrendingPosts />
      </div>
    </article>
  );
};

export default RecentPosts;
