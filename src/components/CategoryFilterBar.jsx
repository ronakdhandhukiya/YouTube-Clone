import React, { useRef, useState } from 'react';

function CategoryFilterBar() {
  const categories = [
    "All",
    "Music",
    "Mixes",
    "Live",
    "Gaming",
    "React",
    "JavaScript",
    "Programming",
    "News",
    "Podcasts",
    "Recently uploaded",
    "Computer programming",
    "Reverberation",
    "Movie musicals",
    "India national cricket team",
    "1990s",
    "Telugu cinema",
    "Dramedy",
    "Dubbing",
    "Indian soap opera",
    "Cricket",
    "Football",
    "Learn Coding",
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const scrollRef = useRef(null);

  const handleWheel = (e) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div ref={scrollRef} onWheel={handleWheel}
      className="flex overflow-x-auto gap-2 pb-1 scroll-smooth"
      style={{ scrollbarWidth: 'none',
        msOverflowStyle: 'none'}}>
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button key={category} onClick={() => setActiveCategory(category)}
            className={`flex-none whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 
              ${ isActive ? "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-200"
                : "bg-gray-100 dark:bg-[#272727] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#3f3f3f]" }`} >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilterBar;