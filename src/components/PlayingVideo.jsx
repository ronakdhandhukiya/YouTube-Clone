import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchData } from "../utils/rapidapi";
import ReactPlayer from "react-player";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
  AiOutlineShareAlt,
  AiOutlineDownload
} from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { BsFillCheckCircleFill, BsThreeDotsVertical } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";
import SuggestedVideo from "./SuggestedVideo";
import Sidebar from "./Sidebar";
import CategoryFilterBar from "./CategoryFilterBar";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthProvider";
import { getVideoComments } from "../utils/commentGenerator";
import { saveVideoComments } from "../utils/commentGenerator";
import {
  toggleWatchLater,
  toggleLikedVideo,
  addToHistory,
  getWatchLater,
  getLikedVideos,
  removeFromLiked
} from '../utils/storage';

function PlayingVideo() {
  const { id } = useParams();
  const location = useLocation();
  const { closeSidebar } = useSidebar();
  const { user } = useAuth();
  const [video, setVideo] = useState(null);
  const [relatedVideo, setRelatedVideo] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const descriptionRef = useRef(null);
  const [isDescriptionTruncated, setIsDescriptionTruncated] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showCommentActions, setShowCommentActions] = useState(false);
  const [likedComments, setLikedComments] = useState({});
  const [dislikedComments, setDislikedComments] = useState({});
  const [openMenu, setOpenMenu] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  useEffect(() => {
    if (id) {
      const data = getVideoComments(id);
      setComments(data);
    }
  }, [id]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const res = await fetchData(`video/details/?id=${id}&hl=en&gl=US`);
        setVideo(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideoDetails();
  }, [id]);

  useEffect(() => {
    if (!video?.title) return;
    const fetchRelatedVideo = async () => {
      try {
        const res = await fetchData(
          `search/?q=${encodeURIComponent(video.title)}&hl=en&gl=US`
        );
        setRelatedVideo(res?.contents || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRelatedVideo();
  }, [video]);

  useEffect(() => {
    if (descriptionRef.current && video?.description) {
      const element = descriptionRef.current;
      setIsDescriptionTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [video?.description]);

  useEffect(() => {
    if (video?.videoId) {
      const videoData = {
        videoId: video?.videoId,
        title: video?.title,
        thumbnails: video?.thumbnails,
        author: video?.author,
        stats: video?.stats,
        lengthSeconds: video?.lengthSeconds,
        publishedTimeText: video?.publishedTimeText
      };

      addToHistory(videoData);

      const watchLater = getWatchLater();
      const isInWatchLater = watchLater.some(v => v.videoId === video.videoId);
      setIsSaved(isInWatchLater);

      const liked = getLikedVideos();
      const isInLiked = liked.some(v => v.videoId === video.videoId);
      setIsLiked(isInLiked);
    }
  }, [video]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleLike = () => {
    const videoData = {
      videoId: video?.videoId,
      title: video?.title,
      thumbnails: video?.thumbnails,
      author: video?.author,
      stats: video?.stats,
      lengthSeconds: video?.lengthSeconds,
      publishedTimeText: video?.publishedTimeText
    };

    if (isLiked) {
      removeFromLiked(video?.videoId);
      setIsLiked(false);
    } else {
      const result = toggleLikedVideo(videoData);
      setIsLiked(true);
      setIsDisliked(false);
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      setIsLiked(false);
    }
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleSave = () => {
    const videoData = {
      videoId: video?.videoId,
      title: video?.title,
      thumbnails: video?.thumbnails,
      author: video?.author,
      stats: video?.stats,
      lengthSeconds: video?.lengthSeconds,
      publishedTimeText: video?.publishedTimeText
    };

    const result = toggleWatchLater(videoData);
    setIsSaved(result.added);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: user ? user.name : "Guest",
      verified: false,
      avatar: user?.profileImage || "https://i.pravatar.cc/150?img=68",
      comment: newComment,
      likes: 0,
      time: "Just now",
      replies: [],
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    saveVideoComments(id, updatedComments);
    setNewComment("");
    setShowCommentActions(false);
  };

  const handleLikeComment = (id) => {
    setLikedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    if (dislikedComments[id]) {
      setDislikedComments((prev) => ({
        ...prev,
        [id]: false,
      }));
    }
  };

  const handleDislikeComment = (id) => {
    setDislikedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    if (likedComments[id]) {
      setLikedComments((prev) => ({
        ...prev,
        [id]: false,
      }));
    }
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
    saveVideoComments(id, updatedComments);
  };

  const handleEditComment = (commentId) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, comment: editText } : comment
    );
    setComments(updatedComments);
    saveVideoComments(id, updatedComments);
    setEditingCommentId(null);
    setEditText("");
  };

  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-white dark:bg-[#0f0f0f] pt-14 transition-colors duration-300">
        <div className="mx-auto max-w-[1800px] px-4 py-6 lg:px-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1 min-w-0 lg:max-w-[75%] xl:max-w-[73%] 2xl:max-w-[72%]">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
                <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}
                  width="100%"
                  height="100%"
                  controls
                  playing
                  config={{
                    youtube: {
                      playerVars: { modestbranding: 1, rel: 0 }
                    }
                  }}
                />
              </div>

              <h1 className="mt-5 text-xl font-medium leading-7 text-gray-900 dark:text-white lg:text-2xl lg:leading-8 transition-colors duration-300">
                {video?.title}
              </h1>

              <div className="mt-4 flex flex-col gap-4 border-b border-gray-200 dark:border-[#272727] pb-5 md:flex-row md:items-center md:justify-between transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <img src={video?.author?.avatar?.[0]?.url || "https://cdn-useast1.kapwing.com/static/templates/youtube-profile-picture-template-1000x1000-pixels-regular-bb908431.webp"}
                    alt={video?.author?.title}
                    className="h-11 w-11 flex-shrink-0 rounded-full object-cover border border-gray-300 dark:border-[#272727] transition-colors duration-300" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
                        {video?.author?.title}
                      </span>
                      {video?.author?.badges?.[0]?.type === "VERIFIED_CHANNEL" && (
                        <BsFillCheckCircleFill className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      {video?.author?.stats?.subscribersText}
                    </p>
                  </div>
                  <button
                    onClick={handleSubscribe}
                    className={`flex-shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${isSubscribed ? "bg-gray-200 dark:bg-[#272727] text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-[#3f3f3f]"
                      : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-200"
                      }`}>
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </button>
                </div>

                <div className="relative overflow-hidden">
                  <div className="flex items-center gap-2 overflow-x-auto scroll-smooth pb-2 -mb-2">
                    <div className="flex items-center rounded-full bg-gray-100 dark:bg-[#272727] overflow-hidden flex-shrink-0 transition-colors duration-300">
                      <button onClick={handleLike} className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium transition-colors hover:bg-gray-200 dark:hover:bg-[#3f3f3f] ${isLiked ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                          }`} >
                        {isLiked ? <AiFillLike className="text-lg sm:text-xl" /> : <AiOutlineLike className="text-lg sm:text-xl" />}
                        <span className="text-xs sm:text-sm">{abbreviateNumber(video?.stats?.likes || 0, 2)}</span>
                      </button>
                      <div className="h-5 sm:h-7 w-px bg-gray-300 dark:bg-[#3f3f3f] transition-colors duration-300" />
                      <button onClick={handleDislike} className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium transition-colors hover:bg-gray-200 dark:hover:bg-[#3f3f3f] ${isDisliked ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                          }`} >
                        {isDisliked ? <AiFillDislike className="text-lg sm:text-xl" /> : <AiOutlineDislike className="text-lg sm:text-xl" />}
                      </button>
                    </div>

                    <button className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-gray-100 dark:bg-[#272727] px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-200 dark:hover:bg-[#3f3f3f] flex-shrink-0">
                      <AiOutlineShareAlt className="text-lg sm:text-xl" />
                      <span className="text-xs sm:text-sm hidden xs:inline">Share</span>
                    </button>

                    <button className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-gray-100 dark:bg-[#272727] px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-200 dark:hover:bg-[#3f3f3f] flex-shrink-0">
                      <AiOutlineDownload className="text-lg sm:text-xl" />
                      <span className="text-xs sm:text-sm hidden xs:inline">Download</span>
                    </button>

                    <button onClick={handleSave} className={`flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium transition-colors flex-shrink-0 ${isSaved ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50" : "bg-gray-100 dark:bg-[#272727] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#3f3f3f]"
                        }`}>
                      <BiSave className="text-lg sm:text-xl" />
                      <span className="text-xs sm:text-sm hidden xs:inline">{isSaved ? "Saved" : "Save"}</span>
                    </button>

                    <button className="rounded-full bg-gray-100 dark:bg-[#272727] p-1.5 sm:p-2 text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-200 dark:hover:bg-[#3f3f3f] flex-shrink-0">
                      <BsThreeDotsVertical className="text-lg sm:text-xl" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3.5 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                <span className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                  {abbreviateNumber(video?.stats?.views || 0, 2)} views
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                <span>{video?.publishedTimeText}</span>
              </div>

              {video?.description && (
                <div className="mt-4 rounded-2xl bg-gray-50 dark:bg-[#181818] p-4 transition-all duration-300">
                  <div ref={descriptionRef} className={`whitespace-pre-wrap text-sm leading-6 text-gray-800 dark:text-gray-200 transition-colors duration-300 ${!showFullDescription ? "line-clamp-3" : "" }`}
                    style={{
                      display: !showFullDescription ? "-webkit-box" : "block",
                      WebkitLineClamp: !showFullDescription ? 3 : "unset",
                      WebkitBoxOrient: "vertical",
                    }} >
                    {video?.description}
                  </div>
                  {(isDescriptionTruncated || showFullDescription) && (
                    <button
                      onClick={toggleDescription}
                      className="mt-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300" >
                      {showFullDescription ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              )}

              <div className="lg:hidden mt-8">
                <div className="bg-white dark:bg-transparent pt-1 pb-3 transition-colors duration-300">
                  <CategoryFilterBar />
                </div>
                <div className="space-y-3">
                  {relatedVideo ?.filter((item) => item?.type === "video").map((item, index) => (
                      <SuggestedVideo key={index} video={item.video} />
                    ))}
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 dark:border-[#272727] pt-6 transition-colors duration-300">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                  Comments {video?.stats?.comments && (
                    <span className="text-gray-500 dark:text-gray-400 font-normal transition-colors duration-300">
                      • {abbreviateNumber(video?.stats?.comments, 2)}
                    </span>
                  )}
                </h2>

                <div className="flex gap-4 mb-8">
                  <img src={user?.profileImage || "https://i.pravatar.cc/150?img=68"}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)}
                      onFocus={() => setShowCommentActions(true)}
                      placeholder="Add a comment..."
                      className="w-full border-b border-gray-300 dark:border-[#272727] bg-transparent pb-2.5 text-sm text-gray-900 dark:text-white outline-none transition-colors placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-b-2 focus:border-black dark:focus:border-white" />
                    {showCommentActions && (
                      <div className="flex justify-end gap-2 mt-3">
                        <button onClick={() => {
                          setNewComment("");
                          setShowCommentActions(false);
                        }}
                          className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors" >
                          Cancel
                        </button>
                        <button disabled={!newComment.trim()} onClick={handleAddComment}
                          className={`px-5 py-2 rounded-full text-sm font-medium text-white transition-colors ${newComment.trim()
                            ? "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800"
                            : "bg-gray-300 dark:bg-[#272727] cursor-not-allowed"
                            }`} >
                          Comment
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {comments.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.avatar} alt={item.user}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white hover:underline cursor-pointer transition-colors">
                            {item.user}
                          </span>
                          {item.verified && (
                            <BsFillCheckCircleFill className="text-[10px] text-gray-500 dark:text-gray-400 flex-shrink-0" />
                          )}
                          <span className="text-xs text-gray-500 dark:text-gray-400">{item.time}</span>
                        </div>

                        {editingCommentId === item.id ? (
                          <div className="mt-2 space-y-2">
                            <input value={editText} onChange={(e) => setEditText(e.target.value)}
                              className="w-full border border-gray-300 dark:border-[#272727] bg-white dark:bg-[#121212] text-gray-900 dark:text-white rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              autoFocus />
                            <div className="flex justify-end gap-2">
                              <button onClick={() => {
                                setEditingCommentId(null);
                                setEditText("");
                              }}
                                className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors" >
                                Cancel
                              </button>
                              <button onClick={() => handleEditComment(item.id)} className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800 transition-colors" >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="mt-1 text-sm text-gray-900 dark:text-gray-200 leading-6 whitespace-pre-wrap break-words transition-colors">
                            {item.comment}
                          </p>
                        )}

                        {editingCommentId !== item.id && (
                          <div className="flex items-center gap-4 mt-2">
                            <button onClick={() => handleLikeComment(item.id)}
                              className={`flex items-center gap-1.5 transition-colors ${likedComments[item.id] ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                }`} >
                              {likedComments[item.id] ? (
                                <AiFillLike className="text-[18px]" />
                              ) : (
                                <AiOutlineLike className="text-[18px]" />
                              )}
                              <span className="text-sm font-medium">
                                {item.likes + (likedComments[item.id] ? 1 : 0)}
                              </span>
                            </button>
                            <button onClick={() => handleDislikeComment(item.id)} className={`transition-colors ${dislikedComments[item.id]
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                              }`} >
                              {dislikedComments[item.id] ? (
                                <AiFillDislike className="text-[18px]" />
                              ) : (
                                <AiOutlineDislike className="text-[18px]" />
                              )}
                            </button>
                            <button className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                              Reply
                            </button>
                          </div>
                        )}
                      </div>

                      {item.user === user?.name && editingCommentId !== item.id && (
                        <div className="relative flex-shrink-0">
                          <button onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors" >
                            <BsThreeDotsVertical className="text-gray-500 dark:text-gray-400 text-lg" />
                          </button>
                          {openMenu === item.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
                              <div className="absolute right-0 mt-1 z-50 min-w-[180px] bg-white dark:bg-[#1f1f1f] rounded-xl shadow-lg border border-gray-200 dark:border-[#272727] overflow-hidden animate-[fadeIn_0.15s_ease-out]">
                                <button onClick={() => {
                                  setEditingCommentId(item.id);
                                  setEditText(item.comment);
                                  setOpenMenu(null);
                                }}
                                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors" >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    handleDeleteComment(item.id);
                                    setOpenMenu(null);
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <style>{`
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: scale(0.95) translateY(-4px);
                  }
                  to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                  }
                }
              `}</style>
            </div>

            <div className="hidden lg:block w-full lg:w-[28%] xl:w-[27%] 2xl:w-[25%] flex-shrink-0">
              <div className="sticky top-20">
                <div className="bg-white dark:bg-transparent pt-1 pb-3 transition-colors duration-300">
                  <CategoryFilterBar />
                </div>
                <div className="max-h-[calc(100vh-7rem)] overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin">
                  <div className="space-y-3 pb-4">
                    {relatedVideo
                      ?.filter((item) => item?.type === "video")
                      .map((item, index) => (
                        <SuggestedVideo key={index} video={item.video} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayingVideo;