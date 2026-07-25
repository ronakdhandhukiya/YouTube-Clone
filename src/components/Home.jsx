import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import Video from "./Video";
import { useAuth } from "../context/AuthProvider.jsx";
import ListItems from "./ListItems.jsx";
import { useSidebar } from "../context/SidebarContext.jsx";
import HomeSkeleton from "./skeletons/HomeSkeleton.jsx";

function Home() {
  const { data, loading } = useAuth();
  const { isOpen } = useSidebar();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSkeleton) {
    return <HomeSkeleton />;
  }

  return (
    <div className="flex pt-14 sm:pt-16">
      <Sidebar />

      <div
        className={`flex-1 min-w-0 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden transition-all duration-300 ${
          isOpen ? "lg:ml-60" : "lg:ml-0"
        }`}
      >
        <ListItems />

        {loading ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 xl:px-8">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="flex flex-col">
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
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 xl:px-8">
            {data.map((item, index) => {
              if (item.type !== "video") return null;
              return (
                <Video key={item.video?.videoId ?? index} video={item.video} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;