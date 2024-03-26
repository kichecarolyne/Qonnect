import React from 'react';
import { HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineLink } from 'react-icons/hi';

function PostItem({ post, placeholderImage, onClick, onReadMoreClick, modal = false }) {
    const PLACEHOLDER = 'https://i.imgur.com/u4gpf2H.png'; // Placeholder image URL
    const handleClick = () => {
        onClick(post);
    };

    if (!post) {
        // If post is undefined, render a placeholder card
        return (
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
                <img className="rounded-t-lg w-full h-[180px]" src={PLACEHOLDER} alt="Placeholder" />
                <div className="p-5">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Placeholder Title</h5>
                    <div className="flex items-center mb-2 text-gray-700 dark:text-gray-400 cursor-pointer">
                        <HiOutlineCalendar className="w-5 h-5 mr-1 text-[20px]" />
                        Placeholder Date
                    </div>
                    <div className="flex items-center mb-3 text-gray-700 dark:text-gray-400 cursor-pointer">
                        <HiOutlineLocationMarker className="w-5 h-5 mr-1 text-[20px]" />
                        Placeholder Location
                    </div>
                    <div className="flex items-center mb-3 text-gray-700 dark:text-gray-400 cursor-pointer hover:underline">
                        <HiOutlineLink className="w-5 h-5 mr-1 text-[20px]" />
                        <a href="#" target="_blank" rel="noopener noreferrer">Placeholder Link</a>
                    </div>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Placeholder Description</p>
                    <a
                        href="#"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Read more
                        <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer w-full" style={{ height: '450px' }}>
            <div className="h-[180px]">
                {post.image && <img className="rounded-t-lg w-full h-full object-cover" src={post.image} alt="" />}
                {!post.image && <div className="bg-gray-500 rounded-t-lg w-full h-full" />} {/* Placeholder for no image */}
            </div>
            <div className="p-5">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">{post.title}</h5>
                <div className="flex items-center mb-2 text-gray-700 dark:text-gray-400 cursor-pointer">
                    <HiOutlineCalendar className="w-5 h-5 mr-1 text-[20px]" />
                    {post.date}
                </div>
                <div className="flex items-center mb-3 text-gray-700 dark:text-gray-400 cursor-pointer" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1, /* Number of lines to show */
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '200px', /* Limiting the width to ensure ellipsis shows up */
                }}>
                    <HiOutlineLocationMarker className="w-5 h-5 mr-1 text-[20px]" />
                    {post.location}
                </div>
                <div className="flex items-center mb-3 text-gray-700 dark:text-gray-400 cursor-pointer hover:underline line-clamp-1">
                <HiOutlineLink className="w-5 h-5 mr-1 text-[20px]" />
                <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        maxWidth: '200px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {post.link}
                </a>
            </div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-1">{post.desc}</p>
                <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default PostItem;
