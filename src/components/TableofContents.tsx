'use client';
import { Post } from 'contentlayer/generated';
import * as React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from '@/components/ui/menubar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface TableofContentsProps {
  headings: Post['headings'];
}

const TableofContents: React.FC<TableofContentsProps> = ({ headings }) => {
  return (
    <Collapsible className='mt-6 border rounded-md '>
      <CollapsibleTrigger
        className='w-full cursor-pointer flex items-center justify-start text-sm font-medium
         py-2 px-4 '
      >
        <ArrowRight className='w-4 h-4 mr-2' />
        Table of Contents
      </CollapsibleTrigger>
      <CollapsibleContent className='px-4'>
        {headings.map(
          (heading: { level: string; text: string; slug: string }) => {
            return (
              <Link
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
              </Link>
            );
          }
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TableofContents;
