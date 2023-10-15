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
    <Collapsible className='mt-6 border rounded-md'>
      <CollapsibleTrigger
        className='w-full cursor-pointer flex items-center justify-start text-sm font-medium
         py-2 px-4 '
      >
        <ArrowRight className='w-4 h-4 mr-2' />
        Table of Contents
      </CollapsibleTrigger>
      <CollapsibleContent className='px-4'>
        <ul className='flex flex-col'>
          {headings.map(
            (heading: { level: string; text: string; slug: string }) => {
              return (
                <li
                  className='list-disc list-inside
                  font-medium text-sm  mb-2
                  text-muted-foreground
                  hover:text-purple-400
                  data-[level=two]:list-none
                 
                  
                  data-[level=three]:pl-2
                '
                  key={heading.slug}
                  data-level={heading.level}
                >
                  <Link href={`#${heading.slug}`} data-level={heading.level}>
                    {heading.level === 'two' ? (
                      <span className='flex w-1 h-1 rounded-full bg-dark mr-2'>
                        &nbsp;
                      </span>
                    ) : null}

                    <span className='hover:underline'>{heading.text}</span>
                  </Link>
                </li>
              );
            }
          )}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TableofContents;
