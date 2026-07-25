import React from 'react';
import NavbarSkeleton from './NavbarSkeleton';
import SidebarSkeleton from './SidebarSkeleton';
import CategorySkeleton from './CategorySkeleton';
import VideoGridSkeleton from './VideoGridSkeleton';

function HomeSkeleton() {
  return (
    <div className="flex pt-14 sm:pt-16 bg-white dark:bg-[#0f0f0f] min-h-screen">
      <SidebarSkeleton />
      <div className="flex-1 min-w-0 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden">
        <CategorySkeleton />
        <VideoGridSkeleton />
      </div>
    </div>
  );
}

export default HomeSkeleton;