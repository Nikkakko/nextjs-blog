import CategoriesBar from '@/components/CategoriesBar';
import FeaturedPosts from '@/components/FeaturedPosts';
import HomeScreen from '@/components/HomeScreen';
import RecentPosts from '@/components/RecentPosts';
import { categories, siteConfig } from '@/config/site';
import { sortBlogs } from '@/lib/utils';
import { allPosts } from 'contentlayer/generated';
import * as React from 'react';

export default async function IndexPage() {
  const blog = allPosts.find(blog => blog.title === 'Next.js');

  const featuredPosts = sortBlogs(allPosts.filter(blog => blog.isFeatured));
  const recentPosts = sortBlogs(
    allPosts.slice(0, 6).filter(blog => blog.title !== 'Next.js')
  );

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className='mt-4 lg:mt-8'>
      <HomeScreen blog={blog} />
      <CategoriesBar categories={categories} title='Categories' />
      {/* <FeaturedPosts featuredPosts={featuredPosts} /> */}
      <RecentPosts recentPosts={recentPosts} title='Recent Posts' />
    </div>
  );
}
