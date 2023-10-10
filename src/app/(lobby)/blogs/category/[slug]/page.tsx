import * as React from 'react';
import GithubSlugger, { slug } from 'github-slugger';
import { allPosts } from 'contentlayer/generated';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

async function CategoryPage({ params: { slug } }: CategoryPageProps) {
  const allCategories = ['all'];

  const posts = allPosts.filter(post => {
    if (slug === 'all') return true;

    return post.tags?.includes(slug);
  });

  return <div>CategoryPage</div>;
}

export default CategoryPage;
