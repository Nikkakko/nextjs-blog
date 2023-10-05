import * as React from 'react';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx/mdx-components';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

async function getDocFromParams(slug: string) {
  const doc = allPosts.find(it => it.slugAsParams === slug);
  if (!doc) {
    return notFound();
  }

  return doc;
}

async function BlogPage({ params }: PageProps) {
  const doc = await getDocFromParams(params.slug);

  return (
    <div>
      <Mdx code={doc?.body.code ?? ''} />
    </div>
  );
}

export default BlogPage;
