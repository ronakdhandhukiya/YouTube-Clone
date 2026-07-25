import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthProvider';
import { getUserData, saveUserData } from '../utils/storage';
import VideoCard from '../components/VideoCard';
import SectionHeader from '../components/SectionHeader';
import EmptyState from '../components/EmptyState';
import { IoMdBookmark } from 'react-icons/io';
import { useSidebar } from '../context/SidebarContext';

function WatchLater() {
  const [videos, setVideos] = useState([]);
  const { isOpen } = useSidebar();
  const { user } = useAuth();

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = () => {
    if (!user) return;
    const data = getUserData(user.id);
    setVideos(data.watchLater || []);
  };

  const handleRemove = (videoId) => {
    if (!user) return;
    const data = getUserData(user.id);
    data.watchLater = (data.watchLater || []).filter(item => item.videoId !== videoId);
    saveUserData(user.id, data);
    setVideos(data.watchLater);
  };

  if (videos.length === 0) {
    return (
      <>
        <Sidebar />
        <div className={`min-h-screen bg-white dark:bg-[#0f0f0f] pt-14 sm:pt-16 transition-all duration-300 ${
          isOpen ? 'lg:ml-60' : 'lg:ml-0' }`}>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <EmptyState
              icon={<IoMdBookmark />}
              title="No videos saved"
              description="Save videos to watch later" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className={`min-h-screen bg-white dark:bg-[#0f0f0f] pt-14 sm:pt-16 transition-all duration-300 ${ isOpen ? 'lg:ml-60' : 'lg:ml-0' }`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <SectionHeader title="Watch Later" count={videos.length} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video) => (
              <div key={video.videoId} className="relative group">
                <VideoCard video={video} />
                <button onClick={() => handleRemove(video.videoId)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 dark:bg-white/20 text-white hover:bg-black dark:hover:bg-white/30 transition-colors opacity-0 group-hover:opacity-100" >
                  <IoMdBookmark className="text-lg" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WatchLater;