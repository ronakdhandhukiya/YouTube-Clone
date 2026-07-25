import React from 'react';

function SuggestedVideoSkeleton() {
  return (
    <div className="flex gap-3 py-1.5 px-2">
      <div className="relative flex-shrink-0 w-40 lg:w-36 xl:w-40 2xl:w-44">
        <div className="aspect-video w-full rounded-xl bg-gray-200 dark:bg-[#272727] animate-pulse"></div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-start pt-0.5">
        <div className="h-4 bg-gray-200 dark:bg-[#272727] rounded w-full mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-[#272727] rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-3 bg-gray-200 dark:bg-[#272727] rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
  );
}

export default SuggestedVideoSkeleton;