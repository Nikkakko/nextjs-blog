'use client';
import * as React from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from '@radix-ui/react-icons';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import { Post, allPosts } from 'contentlayer/generated';
import { Button } from './ui/button';
import { SearchIcon } from 'lucide-react';

import { is } from 'date-fns/locale';

interface SearchBoxProps {}

const SearchBox: React.FC<SearchBoxProps> = ({}) => {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const [data, setData] = React.useState<Post[] | null>(allPosts);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    if (debouncedQuery.length <= 0) {
      setData(null);
      return;
    }

    if (debouncedQuery) {
      startTransition(async () => {
        setData(
          allPosts.filter(post =>
            post.title.toLowerCase().includes(debouncedQuery.toLowerCase())
          )
        );
      });
    } else {
      setData(allPosts);
    }
  }, [debouncedQuery, startTransition]);

  const handleSelect = React.useCallback((callback: () => unknown) => {
    setIsOpen(false);
    callback();
  }, []);

  console.log(debouncedQuery);
  console.log(data);

  return (
    <>
      <Button
        variant='outline'
        className='relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2'
        onClick={() => setIsOpen(true)}
      >
        <SearchIcon className='h-4 w-4 xl:mr-2' aria-hidden='true' />
        <span className='hidden xl:inline-flex'>Search Posts...</span>
        <span className='sr-only'>Search Posts </span>
      </Button>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder='Search products...'
          value={query}
          onValueChange={setQuery}
        />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {data?.map(post => (
            <CommandGroup
              title={post.title}
              heading='Search Results'
              key={post.title}
            >
              <CommandItem
                value={post.title}
                className='cursor-pointer 
                    hover:saturate-150 hover:brightness-125 hover:shadow-lg
                '
                onSelect={() =>
                  handleSelect(() => router.push(`/blogs/${post.slug}`))
                }
              >
                <div className='flex items-center space-x-2'>
                  <span>{post.title}</span>
                </div>
              </CommandItem>
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBox;
