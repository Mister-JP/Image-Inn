// Import icons from Heroicons package for usage in the component
import {
    EyeIcon,
    HandThumbUpIcon,
    ArrowDownTrayIcon,
  } from "@heroicons/react/24/outline";
  
  // Asynchronous function to fetch data from the Pixabay API
  async function getData(query, page) {
    // Send a GET request to the Pixabay API
    const res = await fetch(
      `https://pixabay.com/api/?key=${
        process.env.PIXABAY_API_KEY // Use the Pixabay API key from environment variables
      }&q=${decodeURIComponent(query)}&image_type=photo&page=${page}`
    );
  
    // If the response is not OK (status code is not in the range 200-299), return null
    if (!res.ok) {
      return null;
    }
  
    // If the response is OK, parse it as JSON and return the result
    return res.json();
  }
  
  // Function to handle page change, takes an offset and returns a function that changes the page by the offset when called
  const handlePageChange = (offset) => () => {
    router.push(`/search/${query}/${page + offset}`);
  };
  
  // Asynchronous function component to render the search query
  async function SearchQuery({ params: { query, page } }) {
    // Log the decoded query string for debugging purposes
    console.log(decodeURIComponent(query));
  
    // Fetch data from the Pixabay API
    const data = await getData(query, page);
  
    // Log the fetched data for debugging purposes
    console.log(data);
  
    // Render the search results
    return (
      <div className="bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-green-600 via-white-600 to-light-blue-600 min-h-screen px-2 py-10">
        {/* Render a header indicating that these are the search results */}
        <h1 className="text-5xl mt-1 mb-1 text-center text-gray-700 bg-clip-text text-transparent rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 font-bold leading-loose tracking-widest">
          Image Inn
        </h1>

        {/* Container for the search results */}
        <div className="flex flex-wrap justify-center">
          {/* Iterate over the hits in the fetched data, if it exists */}
          {data?.hits.map((hit) => (
            // Render a card for each hit
            <div
              key={hit.id} // Use the hit's id as the key
              className="max-w-sm rounded overflow-hidden shadow-lg m-4" // Style the card
            >
              {/* Render an image for the hit */}
              <a href={hit.largeImageURL}>
                <img
                  className="w-full object-contain transition-all transform hover:scale-110"
                  style={{ maxHeight: "30vh" }}
                  src={hit.largeImageURL}
                  alt={hit.tags}
                />
              </a>

              {/* Container for the hit's details */}
              <div className="px-6 py-4">
                {/* Render the user who uploaded the hit */}
                <div className="font-bold text-xl mb-2">{hit.user}</div>

                {/* Render the hit's tags */}
                <p className="text-gray-700 text-base">Tags: {hit.tags}</p>

                {/* Render the hit's view count, download count, and like count */}
                <div className="flex items-center mt-2 text-gray-500 text-xs">
                  <EyeIcon className="h-4 w-4 mr-1" /> {/* View icon */}
                  <span>{hit.views}</span> {/* View count */}
                </div>
                <div className="flex items-center mt-2 text-gray-500 text-xs">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-1" />{" "}
                  {/* Download icon */}
                  <span>{hit.downloads}</span> {/* Download count */}
                </div>
                <div className="flex items-center mt-2 text-gray-500 text-xs">
                  <HandThumbUpIcon className="h-4 w-4 mr-1" /> {/* Like icon */}
                  <span>{hit.likes}</span> {/* Like count */}
                </div>
              </div>

              {/* Render the hit's tags as hashtags */}
              <div className="px-6 pt-4 pb-2">
                {hit.tags.split(", ").map((tag, index) => {
                  // Parse the searchParameters string and replace the query part with the tag
                  const queryString = query.replace(/(^[^&]*)/, tag);

                  return (
                    <a
                      key={index}
                      href={`/search/${queryString}/1`}
                      className="inline-block bg-indigo-200 rounded-full px-3 py-1 text-sm font-semibold text-indigo-700 mr-2 mb-2 transition-colors duration-200 ease-in-out hover:bg-gradient-to-r hover:text-white hover:from-pink-500 hover:to-blue-500 cursor-pointer"
                    >
                      #{tag} {/* Tag */}
                    </a>
                  );
                })}
              </div>

              {/* Render the user's profile picture and a download link for the hit */}
              <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                {/* User's profile picture */}
                <img
                  className="w-10 h-10 rounded-full"
                  src={hit.userImageURL}
                  alt={hit.user}
                />

                {/* Download link */}
                <a
                  href={hit.largeImageURL} // Link to the hit's large image URL
                  download // Download the image when the link is clicked
                  className="text-blue-500 hover:underline" // Style the link
                >
                  <ArrowDownTrayIcon className="h-4 w-4 mr-1" />{" "}
                  {/* Download icon */}
                  Download {/* Download text */}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          {/* If the current page is greater than 1, render a link to the previous page */}
          {parseInt(page) > 1 && (
            <a
              href={`/search/${query}/${parseInt(page) - 1}`}
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 transition duration-200 ease-in-out"
            >
              Prev
            </a>
          )}

          {/* If there are 20 hits (the maximum), render a link to the next page */}
          {data != null && data.hits.length == 20 && (
            <a
              href={`/search/${query}/${parseInt(page) + 1}`}
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
            >
              Next
            </a>
          )}
        </div>
      </div>
    );
  }
  
  // Export the component as the default export
  export default SearchQuery;
  