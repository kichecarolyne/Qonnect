import React, { createContext, useContext, useState } from 'react';

const UserPostsContext = createContext(); // Default export for the context

export const useUserPosts = () => useContext(UserPostsContext);

export const UserPostsProvider = ({ children }) => {
  const [userPosts, setUserPosts] = useState([]);

  const deleteUserPost = (postId) => {
    // Implement deletion logic
    setUserPosts(userPosts.filter(post => post.id !== postId));
  };

  const updateUserPost = (postId, newData) => {
    // Implement editing logic
    setUserPosts(userPosts.map(post => post.id === postId ? { ...post, ...newData } : post));
  };

  const setUserPostsInternal = (newUserPosts) => {
    setUserPosts(newUserPosts);
  };

  return (
    <UserPostsContext.Provider value={{ userPosts, deleteUserPost, updateUserPost, setUserPosts: setUserPostsInternal }}>
      {children}
    </UserPostsContext.Provider>
  );
};
