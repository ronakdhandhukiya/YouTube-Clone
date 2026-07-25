import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/rapidapi";
import Sidebar from "./Sidebar.jsx";
import SearchCard from "./SearchCard.jsx";
import { useSidebar } from "../context/SidebarContext.jsx";

function Search() {
  const [result, setResult] = useState();
  const { searchQuery } = useParams();
  const { isOpen } = useSidebar();

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = () => {
    fetchData(`search/?q=${searchQuery}`).then(({ contents }) => {
      console.log(contents);
      setResult(contents);
    });
  };

  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-white dark:bg-[#0f0f0f] pt-14 sm:pt-16 transition-colors duration-300">
        <div className={`transition-all duration-300 ${
          isOpen ? 'lg:ml-60' : 'lg:ml-0'
        }`}>
          <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-4">
            <div className="hidden md:block mb-4 text-sm text-gray-600 dark:text-gray-400">
              {result?.filter(item => item?.type === "video").length || 0} results
            </div>

            <div className="space-y-0 md:space-y-1">
              {result?.map((item, index) => {
                if (item?.type !== "video") return null;
                return <SearchCard key={index} video={item?.video} />;
              })}
            </div>

            {result?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="text-6xl text-gray-300 dark:text-gray-600 mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No results found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Try different keywords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;