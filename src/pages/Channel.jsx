import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthProvider';
import { getUserData } from '../utils/storage';
import { useSidebar } from '../context/SidebarContext';

function Channel() {
  const [stats, setStats] = useState({});
  const { isOpen } = useSidebar();
  const { user } = useAuth();

  useEffect(() => {
    loadChannelData();
  }, []);

  const loadChannelData = () => {
    if (!user) return;
    
    const userData = getUserData(user.id);
    
    setStats({
      totalVideos: 0,
      totalLikes: 0,
      historyCount: (userData.history || []).length,
      watchLaterCount: (userData.watchLater || []).length,
      likedCount: (userData.likedVideos || []).length,
      playlistCount: (userData.playlists || []).length
    });
  };

  if (!user) return null;

  return (
    <>
      <Sidebar />
      <div className={`min-h-screen bg-white dark:bg-[#0f0f0f] pt-14 sm:pt-16 transition-all duration-300 ${ isOpen ? 'lg:ml-60' : 'lg:ml-0' }`}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center">
            <img src={user.profileImage || profile} alt="Channel"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-[#272727]" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Joined {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-[#181818] rounded-xl p-4 text-center transition-colors duration-300">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalVideos}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Videos</div>
            </div>

            <div className="bg-gray-50 dark:bg-[#181818] rounded-xl p-4 text-center transition-colors duration-300">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalLikes}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Likes</div>
            </div>
            <div className="bg-gray-50 dark:bg-[#181818] rounded-xl p-4 text-center transition-colors duration-300">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.historyCount}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">History</div>
            </div>
            <div className="bg-gray-50 dark:bg-[#181818] rounded-xl p-4 text-center transition-colors duration-300">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.watchLaterCount}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Watch Later</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-[#181818] rounded-xl p-4 text-center transition-colors duration-300">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.playlistCount}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Playlists</div>
            </div>
            <div className="bg-gray-50 dark:bg-[#181818] rounded-xl p-4 text-center transition-colors duration-300">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.likedCount}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Liked Videos</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Channel;