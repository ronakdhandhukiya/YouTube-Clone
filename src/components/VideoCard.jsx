import React from 'react';
import { Link } from 'react-router-dom';
import Time from '../loader/Time';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { abbreviateNumber } from 'js-abbreviation-number';

function VideoCard({ video, variant = 'default' }) {
  if (variant === 'horizontal') {
    return (
      <Link to={`/video/${video?.videoId}`}>
        <div className="flex gap-3 py-2 px-2 -mx-2 rounded-xl transition-all duration-200 hover:bg-gray-100/80 dark:hover:bg-[#272727]/80">
          <div className="relative flex-shrink-0 w-40">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-[#272727]">
              <img className="h-full w-full object-cover" src={video?.thumbnails?.[0]?.url}
                alt=""
                loading="lazy" />
              {video?.lengthSeconds && (
                <div className="absolute bottom-1.5 right-1.5 rounded-sm bg-black/90 px-1.5 py-0.5 text-xs font-medium text-white">
                  <Time time={video?.lengthSeconds} />
                </div>
              )}
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <h3 className="line-clamp-2 text-sm font-medium leading-5 text-gray-900 dark:text-white transition-colors">
              {video?.title}
            </h3>
            <div className="mt-1 flex items-center gap-1">
              <span className="truncate text-xs text-gray-600 dark:text-gray-400">
                {video?.author?.title}
              </span>
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <span>{abbreviateNumber(video?.stats?.views || 0, 2)} views</span>
              <span className="text-[8px]">•</span>
              <span>{video?.publishedTimeText}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="group cursor-pointer">
      <Link to={`/video/${video?.videoId}`}>
        <div className="flex flex-col">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-[#272727] transition-all duration-200 group-hover:rounded-none">
            <img className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" src={video?.thumbnails?.[0]?.url}
              alt=""
              loading="lazy"/>
            {video?.lengthSeconds && (
              <div className="absolute bottom-1.5 right-1.5 rounded-sm bg-black/90 px-1.5 py-0.5 text-xs font-medium text-white">
                <Time time={video?.lengthSeconds} />
              </div>
            )}
          </div>
          <div className="mt-3 flex gap-3">
            <div className="flex-shrink-0">
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gray-200 dark:border-[#272727]">
                <img className="h-full w-full rounded-full object-cover"
                  src={video?.author?.avatar?.[0]?.url}
                  alt=""
                  loading="lazy" />
              </div>
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <h3 className="line-clamp-2 text-sm font-medium leading-5 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                {video?.title}
              </h3>
              <div className="mt-1 flex items-center gap-1">
                <span className="truncate text-xs text-gray-600 dark:text-gray-400">
                  {video?.author?.title}
                </span>
                {video?.author?.badges?.[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="flex-shrink-0 text-xs text-gray-500 dark:text-gray-400" />
                )}
              </div>
              <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <span>{abbreviateNumber(video?.stats?.views || 0, 2)} views</span>
                <span className="text-[8px]">•</span>
                <span>{video?.publishedTimeText}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default VideoCard;