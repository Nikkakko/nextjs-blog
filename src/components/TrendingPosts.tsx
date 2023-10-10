import * as React from 'react';

const TrendingPosts: React.FC<{}> = () => {
  return (
    <div
      className='bg-muted-foreground/20 rounded-md p-4 sticky top-[100px] z-50  max-h-96
        mt-8 md:mt-0
        border border-solid border-muted-foreground/20
          
      '
    >
      <div className='flex flex-col'>
        <div className='flex flex-col'>
          <h2 className='text-xl font-bold mb-2'>Tranding Posts</h2>
          <p className='text-sm text-gray-500'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
            autem?
          </p>
        </div>
        <div className='flex flex-row mt-4'>
          <div className='flex flex-col'>
            <p className='text-sm text-gray-500'>12/12/2021</p>
            <p className='text-sm text-gray-500'>Author</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingPosts;
