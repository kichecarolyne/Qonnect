import React, { useState } from 'react';
import { searchPosts } from './utils/searchPosts';

function SearchResults() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    setSearching(true);
    const searchResults = await searchPosts(searchTerm);
    setResults(searchResults);
    setSearching(false);
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
