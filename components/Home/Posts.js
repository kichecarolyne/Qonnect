import React, { useContext, useEffect, useState } from 'react';
import PostItem from './PostItem';
import PostModal from '../PostDetails.js/PostModal';
import { SelectedPostContext } from '../../pages/SelectedPostContext'; // Import SelectedPostContext as named export

function Posts({ posts }) {
    const { selectedPost, setSelectedPost } = useContext(SelectedPostContext); // Use selectedPost and setSelectedPost from context
    const [showModal, setShowModal] = useState(false); // Add state for showModal

    useEffect(() => {
        console.log("Posts", posts);
    }, []);

    const handlePostClick = (item) => {
        setSelectedPost(item); // Update selectedPost using setSelectedPost
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
            {/* Provide the SelectedPostContext value */}
            <SelectedPostContext.Provider value={{ selectedPost, setSelectedPost }}>
                {showModal && <PostModal showModal={showModal} setShowModal={setShowModal} post={selectedPost} />} {/* Conditionally render PostModal */}
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 px-10'>
                    {currentPosts.map((item, index) => (
                        <div key={index} className="flex justify-center" onClick={() => handlePostClick(item)}>
                            <PostItem post={item} modal={true} />
                        </div>
                    ))}
                </div>
            </SelectedPostContext.Provider>
        </div>
    );
}

export default Posts;
