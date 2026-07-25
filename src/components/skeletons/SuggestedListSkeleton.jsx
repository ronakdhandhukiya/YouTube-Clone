import React from 'react';
import SuggestedVideoSkeleton from './SuggestedVideoSkeleton';
import CategorySkeleton from './CategorySkeleton';

function SuggestedListSkeleton() {
  const skeletonCount = 8;

  return (
    <div>
      <CategorySkeleton />
      <div className="space-y-3 mt-2">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SuggestedVideoSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export default SuggestedListSkeleton;