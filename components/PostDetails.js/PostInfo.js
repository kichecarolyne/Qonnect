import React, { useState } from 'react';
import Image from 'next/image';
import { useSelectedPost } from '../../pages/SelectedPostContext';
import UserDetail from './UserDetail';

const PostInfo = ({
    isEditing,
    handleFieldChange,
    titleClicked,
    descriptionClicked,
    dateClicked,
    locationClicked,
    linkClicked,
    additionalDetailsClicked,
  }) => {
    const { selectedPost } = useSelectedPost();

    // Define showAdditionalDetails state and setShowAdditionalDetails function
    const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

    if (!selectedPost) {
        return null;
    }

    const handleInputChange = (field, value) => {
        const updatedPost = { ...selectedPost, [field]: value };
        handleFieldChange(updatedPost);
    };

    return (
        <div className='flex flex-col'>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3">
                    {/* Title */}
                    {titleClicked && isEditing ? (
                        <input
                            type="text"
                            value={selectedPost.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="Enter title..."
                            className={`edit-field ${isEditing ? 'edit-mode border border-blue-500' : ''}`}
                        />
                    ) : (
                        <div>
                            <Image src={selectedPost.image} alt={selectedPost.title} width={500} height={150} className='rounded-lg cursor-pointer' onClick={() => window.open(selectedPost.image)} />
                            <div className="mt-2 mb-2">
                                {/* Date */}
                                {dateClicked && isEditing ? (
                                    <input
                                        type="text"
                                        value={selectedPost.date}
                                        onChange={(e) => handleInputChange('date', e.target.value)}
                                        placeholder="Enter date..."
                                        className={`edit-field ${isEditing ? 'edit-mode border border-blue-500' : ''}`}
                                    />
                                ) : (
                                    <p className="text-white text-md">Date: {selectedPost.date}</p>
                                )}
                                {/* Location */}
                                {locationClicked && isEditing ? (
                                    <input
                                        type="text"
                                        value={selectedPost.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        placeholder="Enter location..."
                                        className={`edit-field ${isEditing ? 'edit-mode border border-blue-500' : ''}`}
                                    />
                                ) : (
                                    <p className="text-white text-md">Location: {selectedPost.location}</p>
                                )}
                                <div className='line-clamp-1'>
                                    {/* Link */}
                                    {linkClicked && isEditing ? (
                                        <input
                                            type="text"
                                            value={selectedPost.link}
                                            onChange={(e) => handleInputChange('link', e.target.value)}
                                            placeholder="Enter link..."
                                            className={`edit-field ${isEditing ? 'edit-mode border border-blue-500' : ''}`}
                                        />
                                    ) : (
                                        <p className="text-white text-md">Link: <a href={selectedPost.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{selectedPost.link}</a></p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="md:w-1/3 md:ml-5">
                    <div>
                        <h2 className='font-bold text-[22px]'>Description</h2>
                        {/* Description */}
                        {descriptionClicked && isEditing ? (
                            <textarea
                                value={selectedPost.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Enter description..."
                                className={`edit-field ${isEditing ? 'edit-mode border border-blue-500' : ''}`}
                            />
                        ) : (
                            <p className='text-[15px] font-light text-white leading-6 line-clamp-6'>{selectedPost.desc}</p>
                        )}
                    </div>
                    {/* Additional details editing */}
                    {additionalDetailsClicked && isEditing && (
                        <div className="mt-4">
                            <textarea
                                value={selectedPost.additionalDetails}
                                onChange={(e) => handleInputChange('additionalDetails', e.target.value)}
                                placeholder="Enter additional details..."
                                className={`edit-field ${isEditing ? 'edit-mode border border-blue-500' : ''}`}
                            />
                        </div>
                    )}
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
