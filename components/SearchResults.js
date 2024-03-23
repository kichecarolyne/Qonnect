import React, { useState } from 'react';
import { searchPosts } from './utils/searchPosts'; // Import the searchPosts function

function SearchResults() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    setSearching(true); // Set searching state to true when search starts
    const searchResults = await searchPosts(searchTerm); // Corrected function call
    setResults(searchResults);
    setSearching(false); // Set searching state to false when search is completed
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {searching && <p>Searching...</p>}
      {!searching && results.length === 0 && <p>Search Not Found</p>}
      {!searching && results.length > 0 && (
        <ul>
          {results.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
