import React from "react";
import { Link } from "react-router-dom";
import Time from "../loader/Time";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";

function Video({ video }) {
  

  return (
    <div className="group cursor-pointer">
      <Link to={`/video/${video?.videoId}`}>
        <div className="flex flex-col">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-[#272727] transition-all duration-200 group-hover:rounded-none">
            <img className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              src={video?.thumbnails[0]?.url}
              alt={video?.title || "Video thumbnail"}
              loading="lazy" />
            {video?.lengthSeconds && (
              <div className="absolute bottom-2 right-2 rounded-[4px] bg-black/85 px-[7px] py-[3px] text-[11px] font-semibold leading-none text-white shadow-[0_1px_2px_rgba(0,0,0,0.3)] backdrop-blur-[3px]">
                <Time time={video?.lengthSeconds} />
              </div>
            )}
          </div>

          <div className="flex mt-3 space-x-2">
            <div className="flex items-start">
              <div className="flex h-9 w-9 rounded-full overflow-hidden border border-gray-200 dark:border-[#272727] flex-shrink-0">
                <img className="h-full w-full rounded-full object-cover"
                  src={video?.author?.avatar[0]?.url}
                  alt={video?.author?.title}
                  loading="lazy" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium line-clamp-2 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-150">
                {video?.title}
              </span>
              <span className="flex items-center font-medium mt-1.5 text-[13px] text-gray-600 dark:text-gray-400">
                {video?.author?.title}
                {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="text-gray-500 dark:text-gray-400 ml-1 text-[11px] flex-shrink-0" />
                )}
              </span>
              <div className="flex items-center text-[13px] text-gray-500 dark:text-gray-400">
                <span>{`${abbreviateNumber(
                  video?.stats?.views,
                  2
                )} views`}</span>
                <span className="flex text-[18px] leading-none font-bold relative top-[-2px] mx-1 text-gray-400 dark:text-gray-500">
                  •
                </span>
                <span>{video?.publishedTimeText}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Video;