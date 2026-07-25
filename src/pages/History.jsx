import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthProvider';
import { getUserData, saveUserData } from '../utils/storage';
import VideoCard from '../components/VideoCard';
import SectionHeader from '../components/SectionHeader';
import EmptyState from '../components/EmptyState';
import { IoMdTime } from 'react-icons/io';
import { useSidebar } from '../context/SidebarContext';

function History() {
  const [history, setHistory] = useState([]);
  const { isOpen } = useSidebar();
  const { user } = useAuth();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    if (!user) return;
    const data = getUserData(user.id);
    setHistory(data.history || []);
  };

  const handleRemove = (videoId) => {
    if (!user) return;
    const data = getUserData(user.id);
    data.history = (data.history || []).filter(item => item.videoId !== videoId);
    saveUserData(user.id, data);
    setHistory(data.history);
  };

  const handleClearAll = () => {
    if (!user) return;
    if (window.confirm('Clear all history?')) {
      const data = getUserData(user.id);
      data.history = [];
      saveUserData(user.id, data);
      setHistory([]);
    }
  };

  if (history.length === 0) {
    return (
      <>
        <Sidebar />
        <div className={`min-h-screen bg-white dark:bg-[#0f0f0f] pt-14 sm:pt-16 transition-all duration-300 ${
          isOpen ? 'lg:ml-60' : 'lg:ml-0' }`}>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <EmptyState icon={<IoMdTime />} title="No history yet"
            description="Videos you watch will appear here"/>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className={`min-h-screen bg-white dark:bg-[#0f0f0f] pt-14 sm:pt-16 transition-all duration-300 ${
        isOpen ? 'lg:ml-60' : 'lg:ml-0' }`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <SectionHeader title="History" count={history.length} actionText="Clear all" onAction={handleClearAll} />

          <div className="space-y-2">
            {history.map((video) => (
              <div key={video.videoId} className="flex items-center gap-4 group">
                <div className="flex-1">
                  <VideoCard video={video} variant="horizontal" />
                </div>
                <button onClick={() => handleRemove(video.videoId)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Remove from history" >
                  <IoMdTime className="text-gray-500 dark:text-gray-400 text-lg" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default History;