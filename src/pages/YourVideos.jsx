import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { IoMdVideocam } from 'react-icons/io';
import { abbreviateNumber } from 'js-abbreviation-number';
import Time from '../loader/Time';
import { useSidebar } from '../context/SidebarContext';

const yourVideos = [
  {
    videoId: 'your-video-1',
    title: 'My First YouTube Video - Welcome to my channel!',
    thumbnails: [{ 
      url: 'https://picsum.photos/seed/video1/1280/720' 
    }],
    author: { title: 'My Channel' },
    stats: { views: 1234 },
    lengthSeconds: 125,
    publishedTimeText: '1 month ago'
  },
  {
    videoId: 'your-video-2',
    title: 'React JS Tutorial for Beginners - Full Course',
    thumbnails: [{ 
      url: 'https://picsum.photos/seed/react/1280/720' 
    }],
    author: { title: 'My Channel' },
    stats: { views: 5678 },
    lengthSeconds: 3600,
    publishedTimeText: '2 weeks ago'
  },
  {
    videoId: 'your-video-3',
    title: 'Amazing Travel Vlog - Beautiful Places in India',
    thumbnails: [{ 
      url: 'https://picsum.photos/seed/travel/1280/720' 
    }],
    author: { title: 'My Channel' },
    stats: { views: 9012 },
    lengthSeconds: 480,
    publishedTimeText: '3 days ago'
  },
  {
    videoId: 'your-video-4',
    title: 'Cooking Recipe - Easy Pasta in 10 Minutes',
    thumbnails: [{ 
      url: 'https://picsum.photos/seed/cooking/1280/720' 
    }],
    author: { title: 'My Channel' },
    stats: { views: 3456 },
    lengthSeconds: 600,
    publishedTimeText: '1 week ago'
  },
  {
    videoId: 'your-video-5',
    title: 'JavaScript Tips & Tricks You Should Know',
    thumbnails: [{ 
      url: 'https://picsum.photos/seed/javascript/1280/720' 
    }],
    author: { title: 'My Channel' },
    stats: { views: 7890 },
    lengthSeconds: 900,
    publishedTimeText: '5 days ago'
  },
  {
    videoId: 'your-video-6',
    title: 'Fitness Motivation - 30 Day Challenge',
    thumbnails: [{ 
      url: 'https://picsum.photos/seed/fitness/1280/720' 
    }],
    author: { title: 'My Channel' },
    stats: { views: 2345 },
    lengthSeconds: 300,
    publishedTimeText: '2 days ago'
  }
];

function YourVideos() {
  const { isOpen } = useSidebar();

  return (
    <>
      <Sidebar />
      <div className={`min-h-screen bg-white dark:bg-[#0f0f0f] pt-14 sm:pt-16 transition-all duration-300 ${
        isOpen ? 'lg:ml-60' : 'lg:ml-0' }`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-medium text-gray-900 dark:text-white">Your Videos</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">({yourVideos.length})</span>
            </div>
          </div>

          {yourVideos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <IoMdVideocam className="text-6xl text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No videos uploaded</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your uploaded videos will appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {yourVideos.map((video) => (
                <Link  key={video.videoId}  to={`/video/${video.videoId}`}
                  className="group cursor-pointer" >
                  <div className="flex flex-col">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-200 dark:bg-[#272727] transition-all duration-300 group-hover:rounded-none">
                      <img className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        src={video.thumbnails[0].url}
                        alt={video.title}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/1280x720/808080/FFFFFF?text=${encodeURIComponent(video.title.substring(0, 20))}`; }} />
                      {video.lengthSeconds && (
                        <div className="absolute bottom-1.5 right-1.5 rounded-sm bg-black/90 px-1.5 py-0.5 text-xs font-medium text-white">
                          <Time time={video.lengthSeconds} />
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex gap-3">
                      <div className="flex min-w-0 flex-1 flex-col">
                        <h3 className="line-clamp-2 text-sm font-medium leading-5 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300">
                          {video.title}
                        </h3>
                        <div className="mt-1 flex items-center gap-1">
                          <span className="truncate text-xs text-gray-600 dark:text-gray-400">
                            {video.author.title}
                          </span>
                        </div>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>{abbreviateNumber(video.stats.views, 2)}
                             views</span>
                          <span className="text-[8px]">•</span>
                          <span>{video.publishedTimeText}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default YourVideos;