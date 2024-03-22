// PostList.js
import React, { useEffect, useState } from 'react';
import Data1 from '@/Data/Data1';

function PostList({ filteredPosts, handlePostClick }) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Function to filter posts based on the selected category
    const filterPostsByCategory = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className='flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 my-10'>
            {Data1.Category.map((category, index) => (
                <div
                    className='cursor-pointer'
                    key={index}
                    onClick={() => filterPostsByCategory(category.title)}
                >
                    <h2 className={`text-[16px] text-center hover:underline ${selectedCategory === category.title ? 'text-blue-500' : ''}`}>
                        {category.title}
                    </h2>
                </div>
            ))}
            {filteredPosts && filteredPosts.map((post) => (
                <div className='cursor-pointer' key={post.id} onClick={() => handlePostClick(post)}>
                    <h2 className='text-[16px] text-center hover:underline'>{post.title}</h2>
                </div>
            ))}
        </div>
    );
}

export default PostList;
