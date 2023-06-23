'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Search = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search/${query}`);
  }

  return (
    <>
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-full max-w-xl mx-auto">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <form onSubmit={handleSearch} className="relative flex justify-center text-sm leading-5">
        <div className="relative flex justify-center text-sm leading-5">
          <span className="px-2 text-gray-500 bg-white">
            <input 
              className="px-4 py-2 mr-2 border border-gray-300 rounded-md 
              hover:border-gray-500 focus:outline-none focus:ring-2 
              focus:ring-indigo-500" 
              type="text" 
              placeholder="Search"
              value={query} 
              onChange={e => setQuery(e.target.value)} 
            />
            <button 
              className="px-4 py-2 text-white bg-indigo-500 rounded-md 
              hover:bg-indigo-600 focus:outline-none focus:ring-2 
              focus:ring-indigo-200"
              onClick={handleSearch}
            >
              Search
            </button>
          </span>
        </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Search