import { abbreviateNumber } from "js-abbreviation-number";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Time from "../loader/Time";
import { Link } from "react-router-dom";

function SearchCard({ video }) {
  console.log(video);
  return (
    <div className="group">
      <Link to={`/video/${video?.videoId}`}>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 py-3 md:py-4 px-2 md:px-4 hover:bg-gray-50/80 dark:hover:bg-[#272727]/50 transition-colors duration-150 rounded-xl">
          <div className="relative flex-shrink-0 w-full md:w-[360px] lg:w-[400px] xl:w-[440px] aspect-video">
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-gray-200 dark:bg-[#272727] transition-all duration-200 group-hover:rounded-none">
              <img className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                src={video?.thumbnails[0]?.url}
                alt={video?.title}
                loading="lazy" />
              {video?.lengthSeconds && (
                <div className="absolute bottom-1.5 right-1.5 rounded-sm bg-black/90 px-1.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                  <Time time={video?.lengthSeconds} />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col flex-1 min-w-0 pt-1 md:pt-0">
            <h3 className="text-base md:text-lg lg:text-xl font-medium leading-6 md:leading-7 text-gray-900 dark:text-white line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-150">
              {video?.title}
            </h3>

            <div className="flex items-center gap-2 mt-1.5 md:mt-2">
              <img className="h-6 w-6 md:h-7 md:w-7 rounded-full object-cover flex-shrink-0"
                src={video?.author?.avatar[0]?.url}
                alt={video?.author?.title} />
              <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-150">
                {video?.author?.title}
              </span>
              {video?.author?.badges?.[0]?.type === "VERIFIED_CHANNEL" && (
                <BsFillCheckCircleFill className="flex-shrink-0 text-[10px] md:text-xs text-gray-500 dark:text-gray-400" />
              )}
            </div>

            <div className="flex items-center gap-1 mt-0.5 text-xs md:text-sm text-gray-600 dark:text-gray-400">
              <span>
                {`${abbreviateNumber(video?.stats?.views, 2)} views`}
              </span>
              <span className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500">•</span>
              <span>{video?.publishedTimeText}</span>
            </div>

            {video?.descriptionSnippet && (
              <p className="hidden md:block mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-5">
                {video?.descriptionSnippet}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SearchCard;