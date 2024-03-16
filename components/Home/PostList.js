import React, { useEffect, useState } from 'react';
import Data1 from '@/Data/Data1';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(Data1.Category);
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 justify-center sm:flex flex-wrap justify-center my-10'>
      {posts.map((item) => (
        <div className='cursor-pointer' key={item.id}>
          <h2 className='text-[16px] text-center hover:underline'>{item.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default PostList;
