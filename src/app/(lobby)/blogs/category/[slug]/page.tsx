import * as React from 'react';
import GithubSlugger, { slug as GitSlug } from 'github-slugger';
import { allPosts } from 'contentlayer/generated';
import { categories } from '@/config/site';
import { slugify } from '@/lib/utils';
import CategoriesDisplay from '@/components/CategoriesDisplay';
import CategoryPostcard from '@/components/cards/CategoryPostcard';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return {
    title: `${params.slug.replaceAll('-', ' ')} blogs`,
    description: `Learn more about ${
      params.slug === 'all' ? 'web development' : params.slug
    } through our collection of expert blogs and tutorials`,
  };
}

async function CategoryPage({ params }: CategoryPageProps) {
  const posts = allPosts.filter(blog => {
    return blog.tags?.some(tag => {
      const slugified = GitSlug(tag);
      const paramAsSlug = GitSlug(params.slug);

      if (params.slug === 'all') {
        return true;
      }

      return slugified === paramAsSlug;
    });
  });

  return (
    <article className='mt-12 flex flex-col text-dark dark:text-light'>
      <div className=' px-5 sm:px-10  md:px-24  sxl:px-32 flex flex-col'>
        <h1 className='mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl capitalize drop-shadow-textpurple'>
          #{slugify(params.slug)}
        </h1>
        <CategoriesDisplay categories={categories} currentSlug={params.slug} />
      </div>

      <div className='grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 grid-rows-2 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32'>
        {posts.map((blog, index) => (
          <article key={index} className=''>
            <CategoryPostcard post={blog} />
          </article>
        ))}
      </div>
    </article>
  );
}

export default CategoryPage;
