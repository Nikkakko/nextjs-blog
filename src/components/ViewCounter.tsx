'use client';
import * as React from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Badge } from '@/components/ui/badge';

const supabase = createClientComponentClient();

interface ViewCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  slug: string;
  noCount?: boolean;
  showCount?: boolean;
}

const ViewCounter: React.FC<ViewCounterProps> = ({
  slug,
  noCount = false,
  showCount = true,
  ...props
}) => {
  const [views, setViews] = React.useState<number | null>(0);

  React.useEffect(() => {
    let isMounted = true;

    const updateViewCount = async () => {
      if (!noCount) {
        try {
          let { error } = await supabase.rpc('increment', {
            slug_text: slug,
          });

          if (error) {
            console.error('Error incrementing view count:', error);
          }
        } catch (error) {
          console.error(
            'An error occurred while incrementing the view count:',
            error
          );
        }
      }

      try {
        let { data, error } = await supabase
          .from('views')
          .select('count')
          .match({ slug: slug })
          .single();

        if (isMounted) {
          if (error) {
            console.error('Error fetching view count:', error);
          }

          setViews(data ? data.count : 0);
        }
      } catch (error) {
        console.error(
          'An error occurred while fetching the view count:',
          error
        );
      }
    };

    updateViewCount();

    return () => {
      isMounted = false;
    };
  }, [slug, noCount]);

  if (showCount) {
    return (
      <div>
        <Badge variant='outline' className='rounded-sm'>
          {views} Views
        </Badge>
      </div>
    );
  } else {
    return null;
  }
};

export default ViewCounter;
