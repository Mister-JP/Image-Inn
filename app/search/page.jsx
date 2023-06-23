'use client'
// Import necessary hooks and modules from react and next/navigation packages
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Declare the Search component
const Search = () => {
  // Declare state variables using useState hook
  const [query, setQuery] = useState(""); // For storing search query
  const [imageType, setImageType] = useState("all"); // For storing selected image type
  const [category, setCategory] = useState(""); // For storing selected category
  const [editorsChoice, setEditorsChoice] = useState(false); // For storing the state of Editor's Choice checkbox
  const [safeSearch, setSafeSearch] = useState(false); // For storing the state of Safe Search checkbox
  const [order, setOrder] = useState("popular"); // For storing the selected order type
  const router = useRouter(); // For routing purposes

  // Function to handle form submission
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare search parameters string
    let searchParameters = `${query}&image_type=${imageType}&category=${category}&editors_choice=${editorsChoice}&safesearch=${safeSearch}&order=${order}`;

    // Route to the search page with the prepared parameters
    router.push(`/search/${searchParameters}/1`);
  }

  // Render the form
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-lg w-full md:max-w-md">
        <h2 className="text-2xl mb-4 text-center font-semibold text-gray-700">Image-Inn Search</h2>

        {/* Input for search query */}
        <div className="mb-4">
          <label className="block text-gray-700">Search</label>
          <input 
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
            hover:border-gray-500 focus:outline-none focus:ring-2 
            focus:ring-indigo-500" 
            type="text" 
            placeholder="Search"
            value={query} 
            onChange={e => setQuery(e.target.value)} // Update the query state variable on input change 
          />
        </div>
        
        {/* Dropdown for image type selection */}
        <div className="mb-4">
          <label className="block text-gray-700">Image Type</label>
          <select className="w-full border border-gray-300 rounded-md" onChange={e => setImageType(e.target.value)}>
            <option value="all">All</option>
            <option value="photo">Photo</option>
            <option value="illustration">Illustration</option>
            <option value="vector">Vector</option>
          </select>
        </div>

        {/* Dropdown for category selection */}
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select className="w-full border border-gray-300 rounded-md" onChange={e => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="fashion">Fashion</option>
            <option value="nature">Nature</option>
            <option value="backgrounds">Backgrounds</option>
            {/* Add other categories here */}
          </select>
        </div>

        {/* Checkbox for Editor's Choice */}
        <div className="mb-4 flex items-center">
          <label className="text-gray-700 mr-3">Editor's Choice</label>
          <input type="checkbox" className="border-gray-300 rounded" onChange={e => setEditorsChoice(e.target.checked)} />
        </div>

        {/* Checkbox for Safe Search */}
        <div className="mb-4 flex items-center">
          <label className="text-gray-700 mr-3">Safe Search</label>
          <input type="checkbox" className="border-gray-300 rounded" onChange={e => setSafeSearch(e.target.checked)} />
        </div>

        {/* Dropdown for order selection */}
        <div className="mb-4">
          <label className="block text-gray-700">Order By</label>
          <select className="w-full border border-gray-300 rounded-md" onChange={e => setOrder(e.target.value)}>
            <option value="popular">Popular</option>
            <option value="latest">Latest</option>
          </select>
        </div>

        {/* Search button */}
        <button 
          className="w-full py-2 text-white bg-indigo-500 rounded-md 
          hover:bg-indigo-600 focus:outline-none focus:ring-2 
          focus:ring-indigo-200"
          onClick={handleSearch} // Call handleSearch function on click
        >
          Search
        </button>
      </form>
    </div>
  )
}

// Export the Search component as the default export
export default Search
