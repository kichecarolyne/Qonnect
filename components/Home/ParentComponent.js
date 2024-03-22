import React, { useState } from 'react';
import Search from './components/Home/Search'; // Assuming the correct path

function ParentComponent() {
  const handleSearch = (searchText) => {
    // Your search logic here
    console.log("Searching for:", searchText);
  };

  return (
    <div>
      {/* Passing handleSearch function as onSearch prop */}
      <Search onSearch={handleSearch} />
    </div>
  );
}

export default ParentComponent;
