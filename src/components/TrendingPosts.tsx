'use client';
import * as React from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Post, allPosts } from 'contentlayer/generated';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import Link from 'next/link';
import Image from 'next/image';
import RecentPostCard from './RecentPostCard';
import { cn, formatDate, truncateText } from '@/lib/utils';
import { buttonVariants } from './ui/button';

const supabase = createClientComponentClient();

type trendingPosts =
  | {
      slug: string;
      count: number;
    }[]
  | null;

const TrendingPosts: React.FC<{}> = () => {
  const [trendingPosts, setTrendingPosts] = React.useState<trendingPosts>(null);

  React.useEffect(() => {
    const fetchTrendingPosts = async () => {
      let isMounted = true;
      try {
        let { data, error } = await supabase
          .from('views')
          .select('slug, count')
          .order('count', { ascending: false })
          .limit(4);

        if (error) {
          console.log(error);
          return;
        }

        setTrendingPosts(data);
      } catch (error) {
        console.error(
          'An error occurred while fetching trending posts:',
          error
        );
      }
    };

    fetchTrendingPosts();

    return () => {
      setTrendingPosts(null);
    };
  }, []);

  const posts = trendingPosts?.map(post => {
    const { slug, count } = post;
    const postDetails = allPosts.find(post => post.slugAsParams === slug);

    return {
      postDetails,
      count,
    };
  });

  if (!posts) return null;

  return (
    <Card className='rounded-md p-4 static lg:sticky h-max top-[100px] w-full max-w-max z-50 mt-6 lg:mt-0 '>
      <CardTitle className='text-xl font-bold mb-4 drop-shadow-textpurple'>
        Trending Posts
      </CardTitle>
      {posts?.map(post => (
        <TrendingPostCard
          key={post?.postDetails?.slug}
          post={post.postDetails!}
          views={post.count}
        />
      ))}
    </Card>
  );
};

export default TrendingPosts;

export const TrendingPostCard: React.FC<{ post: Post; views: number }> = ({
  post,
  views,
}) => {
  return (
    <Link href={`/blogs/${post.slugAsParams}`}>
      <Card className='rounded-md p-4 flex flex-row gap-4 mb-4'>
        <div className='hidden lg:block relative w-full max-w-[100px] '>
          <Image
            src={post.image}
            alt='Image'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='rounded-sm object-cover'
          />
        </div>

        <CardContent className='flex flex-col  px-0 py-0 w-full'>
          <CardHeader className='p-0 '>
            <CardTitle className='text-sm font-bold '>
              {truncateText(post.title, 50)}
            </CardTitle>
          </CardHeader>
          <div className='flex flex-row justify-between items-center'>
            <CardDescription>{post.author}</CardDescription>
            <CardDescription> {views} views</CardDescription>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
