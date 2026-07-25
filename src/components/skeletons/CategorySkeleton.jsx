import React from 'react';

function CategorySkeleton() {
  const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <div className="flex overflow-x-auto gap-2 px-4 mt-3 mb-3 pb-3 ">
      {categories.map((item) => (
        <div
          key={item}
          className="flex-none w-20 h-9 rounded-full bg-gray-200 dark:bg-[#272727] animate-pulse"
        ></div>
      ))}
    </div>
  );
}

export default CategorySkeleton;