import FeaturedPosts from '@/components/FeaturedPosts';
import HomeScreen from '@/components/HomeScreen';
import { sortBlogs } from '@/lib/utils';
import { allPosts } from 'contentlayer/generated';

import * as React from 'react';

export default async function IndexPage() {
  const blog = allPosts.find(blog => blog.title === 'Next.js');

  const featuredPosts = sortBlogs(allPosts.filter(blog => blog.isFeatured));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className='mt-4 lg:mt-8'>
      <HomeScreen blog={blog} />
      <FeaturedPosts featuredPosts={featuredPosts} />
    </div>
  );
}
