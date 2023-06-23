'use client'
// Import necessary hooks and modules from react and next/navigation packages
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
    <div className="flex items-center justify-center h-screen bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-green-600 via-white-600 to-light-blue-600 ">
      <div className="flex-col justify-center h-screen bg-[url('../public/backgroundSearch.png')] w-full bg-cover bg-center">
        <div className="flex mt-10 justify-center w-full">
          <form
            onSubmit={handleSearch}
            className="bg-white p-6 rounded-lg shadow-lg w-full md:max-w-[80%] h-fit md:max-h-fit"
          >
            <h2 className="text-5xl mt-2 mb-1 text-center text-gray-700 bg-clip-text text-transparent rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 font-bold leading-loose tracking-widest">
            Image-Inn Search
            </h2>

            {/* Input for search query */}
            <div className="mb-2">
              <label className="block text-gray-700">Search</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
            hover:border-gray-500 focus:outline-none focus:ring-2 
            focus:ring-indigo-500"
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)} // Update the query state variable on input change
              />
            </div>
            <div className="md:flex md:justify-evenly lg:flex-1">
              {/* Dropdown for image type selection */}
              <div className="mb-2 w-full md:max-w-[20%]">
                <label className="block text-gray-700">Image Type</label>
                <select
                  className="w-full border border-gray-300 rounded-md"
                  onChange={(e) => setImageType(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="photo">Photo</option>
                  <option value="illustration">Illustration</option>
                  <option value="vector">Vector</option>
                </select>
              </div>

              {/* Dropdown for category selection */}
              <div className="mb-2 w-full md:max-w-[20%]">
                <label className="block text-gray-700">Category</label>
                <select
                  className="w-full border border-gray-300 rounded-md"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="fashion">Fashion</option>
                  <option value="nature">Nature</option>
                  <option value="backgrounds">Backgrounds</option>
                  {/* Add other categories here */}
                </select>
              </div>

              {/* Dropdown for order selection */}
              <div className="mb-2 w-full md:max-w-[20%]">
                <label className="block text-gray-700">Order By</label>
                <select
                  className="w-full border border-gray-300 rounded-md"
                  onChange={(e) => setOrder(e.target.value)}
                >
                  <option value="popular">Popular</option>
                  <option value="latest">Latest</option>
                </select>
              </div>
            </div>

            <div className="md:flex md:justify-evenly lg:flex-1">
              {/* Checkbox for Editor's Choice */}
              <div className="mb-2 flex items-center">
                <label className="text-gray-700 mr-3">Editor's Choice</label>
                <input
                  type="checkbox"
                  className="border-gray-300 rounded"
                  onChange={(e) => setEditorsChoice(e.target.checked)}
                />
              </div>

              {/* Checkbox for Safe Search */}
              <div className="mb-2 flex items-center">
                <label className="text-gray-700 mr-3">Safe Search</label>
                <input
                  type="checkbox"
                  className="border-gray-300 rounded"
                  onChange={(e) => setSafeSearch(e.target.checked)}
                />
              </div>
            </div>

            {/* Search button */}
            <button
              className="w-full py-2 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
              onClick={handleSearch} // Call handleSearch function on click
            >
              Search
            </button>
          </form>
        </div>
        <div className="flex mt-30 justify-center my-6">
        
          <Image src="/art.svg" alt="Art" width={150} height={150} />
          <Image src="/idea.svg" alt="Art" width={250} height={250} />
          <Image src="/inspire.svg" alt="Art" width={550} height={550} />
        </div>
        
      </div>
    </div>
  );
}

// Export the Search component as the default export
export default Search
