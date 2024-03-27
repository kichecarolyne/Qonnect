import React, { createContext, useContext, useState } from 'react';

export const SelectedPostContext = createContext();

export const useSelectedPost = () => useContext(SelectedPostContext);

export const SelectedPostProvider = ({ children }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const [editedLocation, setEditedLocation] = useState('');
  const [editedLink, setEditedLink] = useState('');
  const [editedAdditionalDetails, setEditedAdditionalDetails] = useState('');

  return (
    <SelectedPostContext.Provider value={{ 
      selectedPost, 
      setSelectedPost, 
      editedTitle, 
      setEditedTitle, 
      editedDescription, 
      setEditedDescription,
      editedDate,
      setEditedDate,
      editedLocation,
      setEditedLocation,
      editedLink,
      setEditedLink,
      editedAdditionalDetails,
      setEditedAdditionalDetails
    }}>
      {children}
    </SelectedPostContext.Provider>
  );
};
