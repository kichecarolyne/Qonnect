import React from 'react'
import { useSelectedPost } from '../../pages/SelectedPostContext';
import Image from 'next/image';

function UserDetail() {
  const { selectedPost } = useSelectedPost();
  return (
    <div className='mt-4 flex gap-5 
    items-center border-t-[1px]
     border-gray-200 pt-2'>
        <Image src={selectedPost.userImage}
        className='rounded-full'
        alt='user Image' width={40} height={40}/>
        <div>
            <h2>{selectedPost.userName}</h2>
        </div>
    </div>
  )
}

export default UserDetail