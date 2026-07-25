import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  IoMdHome, IoMdTime, IoMdList, IoMdVideocam, IoMdBookmark,
  IoMdMusicalNote, IoMdFilm, IoMdTrophy, IoMdSchool
} from 'react-icons/io';
import {
  MdOutlineAccountCircle, MdOutlinePlaylistPlay, MdOutlineVideoLibrary,
  MdOutlineWatchLater, MdOutlineHistory, MdOutlineSubscriptions,
  MdOutlineMusicNote, MdOutlineMovie, MdOutlineSportsEsports,
  MdOutlinePodcasts
} from 'react-icons/md';
import { AiOutlineLike, AiOutlineHome, AiOutlineFire } from 'react-icons/ai';
import { SiYoutubeshorts } from 'react-icons/si';
import { FaYoutube, FaChevronRight, FaNewspaper, FaGamepad } from 'react-icons/fa';
import { useSidebar } from '../context/SidebarContext';

const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebar();
  const location = useLocation();

  const handleNavClick = () => {
    if (window.innerWidth < 1024) closeSidebar();
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const mainItems = [
    { id: 1, name: "Home", icon: <AiOutlineHome />, path: "/" },
    { id: 2, name: "Shorts", icon: <SiYoutubeshorts />, path: "/shorts" },
    { id: 3, name: "Subscriptions", icon: <MdOutlineSubscriptions />, path: "/subscriptions" },
  ];

  const youItems = [
    { id: 1, name: "Your Channel", icon: <MdOutlineAccountCircle />, path: "/channel" },
    { id: 2, name: "History", icon: <MdOutlineHistory />, path: "/history" },
    { id: 3, name: "Playlists", icon: <MdOutlinePlaylistPlay />, path: "/playlists" },
    { id: 4, name: "Your Videos", icon: <MdOutlineVideoLibrary />, path: "/your-videos" },
    { id: 5, name: "Watch Later", icon: <MdOutlineWatchLater />, path: "/watch-later" },
    { id: 6, name: "Liked Videos", icon: <AiOutlineLike />, path: "/liked" },
  ];

  const exploreItems = [
    { id: 1, name: "Trending", icon: <AiOutlineFire />, path: "/trending" },
    { id: 2, name: "Music", icon: <MdOutlineMusicNote />, path: "/music" },
    { id: 3, name: "Movies", icon: <MdOutlineMovie />, path: "/movies" },
    { id: 4, name: "Gaming", icon: <FaGamepad />, path: "/gaming" },
    { id: 5, name: "News", icon: <FaNewspaper />, path: "/news" },
    { id: 6, name: "Sports", icon: <IoMdTrophy />, path: "/sports" },
    { id: 7, name: "Learning", icon: <IoMdSchool />, path: "/learning" },
    { id: 8, name: "Podcasts", icon: <MdOutlinePodcasts />, path: "/podcasts" },
  ];

  const moreItems = [
    { id: 1, name: "YouTube Premium", icon: <FaYoutube />, path: "/premium" },
    { id: 2, name: "YouTube Studio", icon: <IoMdVideocam />, path: "/studio" },
    { id: 3, name: "YouTube Music", icon: <IoMdMusicalNote />, path: "/music" },
    { id: 4, name: "YouTube Kids", icon: <IoMdBookmark />, path: "/kids" },
  ];

  const renderItem = (item, highlightId = null) => {
    const active = isActive(item.path);

    return (
      <Link key={item.id} to={item.path} onClick={handleNavClick} className={`flex items-center gap-5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150 ${active || item.id === highlightId ? "bg-gray-100 dark:bg-[#272727] font-semibold" : "hover:bg-gray-100 dark:hover:bg-[#272727]"
        }`} >
        <div className={`text-xl shrink-0 ${active ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
          {item.icon}
        </div>
        <span className="text-sm truncate text-gray-900 dark:text-white">{item.name}</span>
      </Link>
    );
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={() => {
            if (window.innerWidth < 1024) closeSidebar();
          }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <aside className={`fixed top-14 sm:top-16 left-0 z-50 w-64 sm:w-60 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] bg-white dark:bg-[#0f0f0f] border-r border-gray-200 dark:border-[#272727] overflow-y-auto overflow-x-hidden px-3 py-3 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`} >
        <div className="space-y-1">
          {mainItems.map((item) => renderItem(item, 1))}
        </div>

        <hr className="my-3 border-gray-200 dark:border-[#272727]" />

        <div className="space-y-1">
          <div className="flex items-center gap-1 px-3 py-2">
            <h1 className="font-semibold text-sm text-gray-900 dark:text-white">You</h1>
            <FaChevronRight className="text-[12px] text-gray-500 dark:text-gray-400" />
          </div>
          {youItems.map((item) => renderItem(item))}
        </div>

        <hr className="my-3 border-gray-200 dark:border-[#272727]" />

        <div className="space-y-1">
          <h1 className="font-semibold text-sm px-3 py-2 text-gray-900 dark:text-white">Explore</h1>
          {exploreItems.map((item) => renderItem(item))}
        </div>

        <hr className="my-3 border-gray-200 dark:border-[#272727]" />

        <div className="space-y-1">
          <h1 className="font-semibold text-sm px-3 py-2 text-gray-900 dark:text-white">More From YouTube</h1>
          {moreItems.map((item) => renderItem(item))}
        </div>

        <hr className="my-3 border-gray-200 dark:border-[#272727]" />

        <p className="text-xs text-gray-500 dark:text-gray-400 leading-5 px-3">
          About Press Copyright <br /> Contact us Creators <br /> Advertise Developers
          <br />
          <span className="block mt-2">Terms Privacy Policy &amp; Safety</span>
          How YouTube works <br /> Test new features
        </p>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 px-3 pb-4">
          © 2026 Learn Coding
        </p>
      </aside>
    </>
  );
};

export default Sidebar;