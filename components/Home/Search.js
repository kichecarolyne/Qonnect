import React, { useState } from 'react'

function Search() {
  const [searchText, setSearchText]=useState();
  const onSearchButtonClick=()=>{
    console.log("Search Text:",searchText)
  }
  return (
    <form className="max-w-xl mx-auto">
      <div className='my-8'>  
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input 
              type="search" 
              onChange={(e) => setSearchText(e.target.value)} 
              id="default-search" 
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Search Projects, Events..." 
              required 
            />
            <button 
              type="button" 
              onClick={onSearchButtonClick} 
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-300 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Search
            </button>
        </div>
      </div>
    </form>
  );
}

export default Search;