import React from 'react';
import Search from './Home/Search';
import SearchResults from './SearchResults'

function ParentComponent() {
  const handleSearch = async (searchText) => {
    try {
      const response = await fetch(`https://api.example.com/search?q=${searchText}`);
      const data = await response.json();
      console.log("Search results:", data);
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
