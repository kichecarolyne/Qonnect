import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import PostModal from '../PostDetails.js/PostModal';

function Posts({ posts }) {
    const [post, setPost] = useState(null);
    const [showModal, setShowModal] = useState(false); // Add state for showModal

    useEffect(() => {
        console.log("Posts", posts);
    }, []);

    const handlePostClick = (item) => {
        setPost(item);
        setShowModal(true); // Update showModal state
    };

    // Logic to get current posts
    const currentPage = 1; // Assuming currentPage is managed elsewhere
    const postsPerPage = 9;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div>
            {showModal && <PostModal showModal={showModal} setShowModal={setShowModal} post={post} />} {/* Conditionally render PostModal */}
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 px-10'>
                {currentPosts.map((item, index) => (
                    <div key={index} className="flex justify-center" onClick={() => handlePostClick(item)}>
                        <PostItem post={item} modal={true} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;
