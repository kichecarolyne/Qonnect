import React, { useContext } from 'react';
import { SelectedPostContext } from '../Profile/MyPosts';
import Image from 'next/image';
import UserInfo from '../Profile/UserInfo';
import UserDetail from './UserDetail';

function PostInfo() {
    const post = useContext(SelectedPostContext);

    // Check if post exists before using it
    if (!post) {
        return <div>Loading...</div>; // Or any other fallback UI
    }

    return (
        <div>
            <h2 className='font-medium text-[18px] mb-3'>{post.title}</h2>
            <Image src={post.image} alt={post.title} width={500} height={200} className='rounded-lg cursor-pointer' onClick={() => window.open(post.image)} />
            <h2 className='font-bold'>Description</h2>
            <p className='text-[14px] font-light text-gray-500 leading-6 line-clamp-5'>{post.desc}</p>
            <UserDetail />
        </div>
    );
}

export default PostInfo;
