import {
  EyeIcon,
  HandThumbUpIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

async function getData(query) {
  const res = await fetch(
    `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${query}&image_type=photo`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function SearchQuery({ params: { query } }) {
  const data = await getData(query);
  console.log(data);
  return (
    <div className="bg-gray-100 min-h-screen px-2 py-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">
        Results
      </h1>
      <div className="flex flex-wrap justify-center">
        {data.hits.map((hit) => (
          <div
            key={hit.id}
            className="max-w-sm rounded overflow-hidden shadow-lg m-4"
          >
            <img className="w-full" src={hit.previewURL} alt={hit.tags} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{hit.user}</div>
              <p className="text-gray-700 text-base">Tags: {hit.tags}</p>
              <div className="flex items-center mt-2 text-gray-500 text-xs">
                <EyeIcon className="h-4 w-4 mr-1" />
                <span>{hit.views}</span>
              </div>
              <div className="flex items-center mt-2 text-gray-500 text-xs">
                <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                <span>{hit.downloads}</span>
              </div>
              <div className="flex items-center mt-2 text-gray-500 text-xs">
                <HandThumbUpIcon className="h-4 w-4 mr-1" />
                <span>{hit.likes}</span>
              </div>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-indigo-200 rounded-full px-3 py-1 text-sm font-semibold text-indigo-700 mr-2 mb-2">
                #{hit.tags.split(", ")[0]}
              </span>
              <span className="inline-block bg-indigo-200 rounded-full px-3 py-1 text-sm font-semibold text-indigo-700 mr-2 mb-2">
                #{hit.tags.split(", ")[1]}
              </span>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-between items-center">
              <img
                className="w-10 h-10 rounded-full"
                src={hit.userImageURL}
                alt={hit.user}
              />
              <a
                href={hit.pageURL}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                View on Pixabay
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchQuery;
