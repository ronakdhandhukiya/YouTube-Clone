import React from 'react';

function SidebarSkeleton() {
  const skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="hidden lg:block w-60 flex-shrink-0 h-full border-r border-gray-200 dark:border-[#272727] px-3 py-3">
      {skeletonItems.map((item) => (
        <div
          key={item}
          className="flex items-center gap-5 px-3 py-2.5"
        >
          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-[#272727] animate-pulse"></div>
          <div className="flex-1 h-4 bg-gray-200 dark:bg-[#272727] rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}

export default SidebarSkeleton;