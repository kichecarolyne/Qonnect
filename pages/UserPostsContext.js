import React, { createContext, useContext, useState } from 'react';

const UserPostsContext = createContext();

export const useUserPosts = () => useContext(UserPostsContext);

export const UserPostsProvider = ({ children }) => {
  const [userPosts, setUserPosts] = useState([]);

  const deleteUserPost = (postId) => {
    // Deletion logic
    setUserPosts(userPosts.filter(post => post.id !== postId));
  };

  const updateUserPost = (postId, newData) => {
    // Editing logic
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
