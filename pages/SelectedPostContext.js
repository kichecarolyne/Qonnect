import React, { createContext, useContext, useState } from 'react';

export const SelectedPostContext = createContext(); // Named export for the context

export const useSelectedPost = () => useContext(SelectedPostContext);

export const SelectedPostProvider = ({ children }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <SelectedPostContext.Provider value={{ selectedPost, setSelectedPost }}>
      {children}
    </SelectedPostContext.Provider>
  );
};
