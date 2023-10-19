import * as React from 'react';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx/mdx-components';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { cn, formatDate } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { siteMetadata } from '@/lib/siteMetadata';
import ViewCounter from '@/components/ViewCounter';
import TableofContents from '@/components/TableofContents';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allPosts.map(post => ({ params: { slug: post.slugAsParams } }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = allPosts.find(it => it.slugAsParams === params.slug);

  if (!post) {
    return notFound();
  }

  const publishedAt = new Date(post.publishedAt).toISOString();
  const modifiedAt = new Date(post.updatedAt || post.publishedAt).toISOString();

  const authors = post.author ? [post.author] : siteMetadata.author;

  return {
    title: post.title,
    description: post.description,

    openGraph: {
      title: post.title,
      description: post.description,
      url: siteMetadata.siteUrl + post.slug,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      authors: authors.length > 0 ? authors : siteMetadata.author,
      images: [siteMetadata.socialBanner],
    },

    twitter: {
      card: 'summary_large_image',
      title: siteMetadata.title,
      images: [siteMetadata.socialBanner],
    },
  };
}

async function BlogPage({ params }: PageProps) {
  const post = allPosts.find(it => it.slugAsParams === params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <article className='relative px-4 xl:px-0 max-w-3xl py-6 lg:py-10 mx-auto'>
      <Link
        href='/blogs/category/all'
        className={cn(
          buttonVariants({ variant: 'link', className: 'p-0' }),
          'static xl:absolute xl:left-[-200px] xl:top-14  xl:inline-flex'
        )}
      >
        <ChevronLeft className='mr-2 h-4 w-4' />
        See all posts
      </Link>
      <div>
        <div className='flex flex-col space-y-1'>
          {post.publishedAt && (
            <time
              dateTime={post.publishedAt}
              className='block text-sm text-muted-foreground'
            >
              Published on {formatDate(post.publishedAt)}
            </time>
          )}
          {post.readingTime && (
            <span className='block text-sm text-muted-foreground'>
              {post.readingTime.text}
            </span>
          )}
        </div>

        <h1
          className='mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl
          drop-shadow-textpurple
        '
        >
          {post.title}
        </h1>

        <div className='flex justify-between items-end '>
          <div className='flex items-center mt-4 space-x-2'>
            <Link href={`https://github.com/nikkakko`}>
              <Image
                src='/images/avatar/avatar.png'
                alt='avatar'
                width={40}
                height={40}
                className='rounded-full bg-white'
              />
            </Link>
            <div className='flex flex-col leading-tight'>
              <span className=' text-sm'>Author</span>
              <span className='text-xs text-muted-foreground'>
                {post.author}
              </span>
            </div>
          </div>
          <ViewCounter slug={params.slug} />
        </div>
      </div>

      {post.image && (
        <div
          className='relative w-full mt-4
          aspect-[16/9] xl:aspect-[16/9]
        '
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='rounded-md object-cover'
            priority
          />
        </div>
      )}

      <TableofContents headings={post.headings} />
      <Mdx code={post?.body.code} />
    </article>
  );
}

export default BlogPage;
