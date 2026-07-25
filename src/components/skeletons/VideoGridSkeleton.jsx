import React from 'react';
import VideoCardSkeleton from './VideoCardSkeleton';

function VideoGridSkeleton() {
  const skeletonCount = 12;

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 xl:px-8">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default VideoGridSkeleton;