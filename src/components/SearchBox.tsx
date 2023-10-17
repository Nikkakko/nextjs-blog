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

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = React.useCallback((callback: () => unknown) => {
    setIsOpen(false);
    callback();
  }, []);

  return (
    <>
      <Button
        variant='outline'
        className='relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2'
        onClick={() => setIsOpen(true)}
      >
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center'>
            <SearchIcon className='h-4 w-4 xl:mr-2' aria-hidden='true' />
            <span className='hidden xl:inline-flex'>Search Posts...</span>
            <span className='sr-only'>Search Posts </span>
          </div>
          <div className='flex justify-end'>
            {' '}
            <p className='text-sm text-muted-foreground'>
              Press{' '}
              <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
                <span className='text-xs'>⌘</span>J
              </kbd>
            </p>
          </div>
        </div>
      </Button>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder='Search products...'
          value={query}
          onValueChange={setQuery}
        />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup title='Search Results' heading='Search Results'>
            {data?.map(post => (
              <CommandItem
                value={post.title}
                key={post.title}
                className='cursor-pointer 
                    hover:saturate-150 hover:brightness-125 hover:shadow-lg
                '
                onSelect={() =>
                  handleSelect(() => router.push(`/blogs/${post.slugAsParams}`))
                }
              >
                <div className='flex items-center space-x-2'>
                  <span>{post.title}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBox;
