import React from "react";

function ListItems() {
  const categories = [
    "All",
    "Music",
    "React routers",
    "Computer programming",
    "Reverberation",
    "Movie musicals",
    "India national cricket team",
    "News",
    "Mixes",
    "1990s",
    "Telugu cinema",
    "Live",
    "Dramedy",
    "Dubbing",
    "Indian soap opera",
    "Cricket",
    "Football",
    "Learn Coding",
  ];
  
  return (
    <div className="flex overflow-x-scroll hide-scroll-bar px-4 mt-3 mb-3">
      <div className="flex space-x-4 flex-nowrap">
        {categories.map((category) => {
          return (
            <div key={category}
              className="mb-4 flex-none bg-gray-200 dark:bg-[#272727] hover:bg-gray-300 dark:hover:bg-[#3f3f3f] duration-300 rounded-xl px-4 py-2 font-medium text-gray-700 dark:text-white cursor-pointer transition-colors" >
              {category}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListItems;