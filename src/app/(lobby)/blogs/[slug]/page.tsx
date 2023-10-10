import * as React from 'react';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx/mdx-components';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { cn, formatDate } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

interface PageProps {
  params: {
    slug: string;
  };
}

async function getDocFromParams(slug: string) {
  const post = allPosts.find(it => it.slugAsParams === slug);

  if (!post) {
    return notFound();
  }

  return post;
}

async function BlogPage({ params }: PageProps) {
  const post = await getDocFromParams(params.slug);

  return (
    <article className='container relative max-w-3xl py-6 lg:py-10'>
      <Link
        href='/blogs'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-[-200px] top-14 hidden xl:inline-flex'
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
            <span className='text-xs text-muted-foreground'>{post.author}</span>
          </div>
        </div>
      </div>

      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className='my-8 rounded-md border bg-muted transition-colors'
          priority
        />
      )}

      {/* Refactor TOC Component */}
      {/* <div className='my-8  absolute left-[-200px] top-20 hidden xl:inline-flex  '>
        <ul className='mt-4 font-in text-base sticky'>
          {post.headings.map(
            (heading: { level: string; text: string; slug: string }) => {
              return (
                <li key={`#${heading.slug}`} className='py-1'>
                  <a
                    href={`#${heading.slug}`}
                    data-level={heading.level}
                    className='data-[level=two]:pl-0  data-[level=two]:pt-2
                                       data-[level=two]:border-t border-solid border-dark/40
                                       data-[level=three]:pl-4
                                       sm:data-[level=three]:pl-6
                                       flex items-center justify-start
                                       '
                  >
                    {heading.level === 'three' ? (
                      <span className='flex w-1 h-1 rounded-full bg-dark mr-2'>
                        &nbsp;
                      </span>
                    ) : null}

                    <span className='hover:underline'>{heading.text}</span>
                  </a>
                </li>
              );
            }
          )}
        </ul>
      </div> */}
      <Mdx code={post?.body.code} />
    </article>
  );
}

export default BlogPage;
