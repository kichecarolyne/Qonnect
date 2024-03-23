import React from 'react';
import Search from './Home/Search'; // Importing Search directly
import SearchResults from './SearchResults'

function ParentComponent() {
  const handleSearch = async (searchText) => {
    try {
      // Example: Making an API call to fetch search results
      const response = await fetch(`https://api.example.com/search?q=${searchText}`);
      const data = await response.json();
      console.log("Search results:", data);
      // Handle the fetched data, update state, or perform any other actions
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <h1>Search Component Example</h1>
      <Search onSearch={handleSearch} />
    </div>
  );
}

export default ParentComponent;
