import React from "react";
import { Link } from "react-router-dom";
import Time from "../loader/Time";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";

function SuggestedVideo({ video }) {
 
  return (
    <div className="group">
      <Link to={`/video/${video?.videoId}`}>
        <div className="flex gap-3 py-1.5 px-2 -mx-2 rounded-xl transition-all duration-200 hover:bg-gray-100/80 dark:hover:bg-[#272727]/80">
          <div className="relative flex-shrink-0 w-40 lg:w-36 xl:w-40 2xl:w-44">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl transition-all duration-200 group-hover:rounded-none bg-gray-100 dark:bg-[#272727]">
              <img className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                src={video?.thumbnails?.[0]?.url}
                alt={video?.title || "Video thumbnail"}
                loading="lazy" />
              {video?.lengthSeconds && (
                <div className="absolute bottom-1.5 right-1.5 rounded-[4px] bg-black/85 px-[6px] py-[2px] text-[10px] font-semibold leading-none text-white shadow-[0_1px_2px_rgba(0,0,0,0.3)] backdrop-blur-[2px]">
                  <Time time={video?.lengthSeconds} />
                </div>
              )}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-start pt-0.5">
            <h3 className="line-clamp-2 text-sm font-medium leading-5 text-gray-900 dark:text-white transition-colors group-hover:text-gray-700 dark:group-hover:text-gray-300">
              {video?.title}
            </h3>

            <div className="mt-1.5 flex items-center gap-1">
              <span className="truncate text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                {video?.author?.title}
              </span>
              {video?.author?.badges?.[0]?.type === "VERIFIED_CHANNEL" && (
                <BsFillCheckCircleFill className="flex-shrink-0 text-[10px] text-gray-500 dark:text-gray-400" />
              )}
            </div>

            <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <span>
                {video?.stats?.views && 
                  `${abbreviateNumber(video?.stats?.views, 2)} views`
                }
              </span>
              {video?.stats?.views && video?.publishedTimeText && (
                <span className="flex items-center">
                  <span className="text-[8px] text-gray-400 dark:text-gray-500">•</span>
                </span>
              )}
              <span className="truncate">{video?.publishedTimeText}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SuggestedVideo;