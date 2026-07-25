import React from 'react';

function NavbarSkeleton() {
  return (
    <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between h-14 sm:h-16 bg-white dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-[#272727] px-2 sm:px-4">
      <div className="flex items-center gap-1 sm:gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#272727] animate-pulse"></div>
        <div className="w-24 h-5 bg-gray-200 dark:bg-[#272727] rounded animate-pulse"></div>
      </div>
      <div className="hidden sm:flex flex-1 max-w-[720px] mx-4 items-center">
        <div className="flex-1 h-10 rounded-l-full bg-gray-200 dark:bg-[#272727] animate-pulse"></div>
        <div className="w-16 h-10 rounded-r-full bg-gray-300 dark:bg-[#3f3f3f] animate-pulse"></div>
        <div className="ml-3 w-10 h-10 rounded-full bg-gray-200 dark:bg-[#272727] animate-pulse"></div>
      </div>
      <div className="flex items-center gap-1">
        <div className="hidden sm:flex items-center gap-1">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#272727] animate-pulse"></div>
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#272727] animate-pulse"></div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#272727] animate-pulse"></div>
      </div>
    </div>
  );
}

export default NavbarSkeleton;