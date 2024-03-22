// PostInfo.js
import React, { useState } from 'react'; // Import useState
import Image from 'next/image';
import { useSelectedPost } from '../../pages/SelectedPostContext';
import UserDetail from './UserDetail';

function PostInfo() {
    const { selectedPost } = useSelectedPost(); // Retrieve selectedPost from context

    // Define showAdditionalDetails state and setShowAdditionalDetails function
    const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

    // Make sure selectedPost exists before accessing its properties
    if (!selectedPost) {
        return null; // Handle the case when selectedPost is not available
    }

    return (
        <div className='flex flex-col'>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3">
                    <Image src={selectedPost.image} alt={selectedPost.title} width={500} height={150} className='rounded-lg cursor-pointer' onClick={() => window.open(selectedPost.image)} />
                    <div className="mt-2 mb-2">
                        <p className="text-white text-md">Date: {selectedPost.date}</p>
                        <p className="text-white text-md">Location: {selectedPost.location}</p>
                        <div className='line-clamp-1'>
                            <p className="text-white text-md">Link: <a href={selectedPost.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{selectedPost.link}</a></p>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/3 md:ml-5">
                    <div>
                        <h2 className='font-bold text-[22px]'>Description</h2>
                        <p className='text-[15px] font-light text-white leading-6 line-clamp-6'>{selectedPost.desc}</p>
                    </div>
                </div>
            </div>
            <UserDetail />
            {/* Render additional details section if it exists */}
            {selectedPost.additionalDetails && (
            <div className="mt-4">
                <button onClick={() => setShowAdditionalDetails(!showAdditionalDetails)} className="text-blue-500 hover:underline focus:outline-none">Read More</button>
                {showAdditionalDetails && (
                    <div className="mt-4">
                        {selectedPost.additionalDetails.split('\n').map((paragraph, index) => (
                            <p key={index} className="text-[15px] font-light text-white leading-6 mb-4">{paragraph}</p>
                        ))}
                    </div>
                )}
            </div>
        )}
        </div>
    );
}

export default PostInfo;
