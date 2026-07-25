import React from 'react';

function VideoCardSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="relative aspect-video w-full rounded-xl bg-gray-200 dark:bg-[#272727] animate-pulse"></div>
      <div className="flex mt-3 space-x-2">
        <div className="flex-shrink-0">
          <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-[#272727] animate-pulse"></div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="h-4 bg-gray-200 dark:bg-[#272727] rounded w-full mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-[#272727] rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-3 bg-gray-200 dark:bg-[#272727] rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default VideoCardSkeleton;