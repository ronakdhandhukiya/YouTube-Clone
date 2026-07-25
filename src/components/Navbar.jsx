import React, { useState, useRef, useEffect } from "react";
import { FiMenu, FiArrowLeft, FiUser } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { AiOutlineBell } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import logo1 from "../../public/yt-logo.png";
import logo2 from "../../public/youtube-logo-light.png";
import { useSidebar } from "../context/SidebarContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthProvider";
import "../index.css";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const { theme, setLightTheme, setDarkTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const searchInputRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleBack = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between h-14 sm:h-16 bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur-sm border-b border-gray-200 dark:border-[#272727] px-2 sm:px-4 transition-colors duration-300">
      
      <div className="flex items-center gap-1 sm:gap-4 shrink-0">
        <button  onClick={toggleSidebar} aria-label="Toggle sidebar" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-200 text-gray-900 dark:text-white" >
          <FiMenu className="text-xl" />
        </button>
        
        {!isSearchOpen && (
          <Link to="/" className="cursor-pointer">
            <img  src={theme === 'light' ? logo1 : logo2}  alt="YouTube" 
              className="w-30 h-[18px] md:w-31 md:h-[20px] lg:w-31 lg:h-[22px]"  />
          </Link>
        )}
      </div>

      <div className="hidden sm:flex flex-1 max-w-[720px] mx-4 items-center">
        <form onSubmit={handleSearch} className="flex flex-1 items-center">
          <div className="flex-1 h-10 flex items-center">
            <input type="text" placeholder="Search" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-full h-full px-4 rounded-l-full border border-gray-300 dark:border-[#272727] bg-white dark:bg-[#121212] text-gray-900 dark:text-white outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:shadow-[inset_0_0_0_1px_#1c62b9] text-sm transition-colors duration-300" />
          </div>
          <button  type="submit" className="h-10 px-5 flex items-center justify-center border border-l-0 border-gray-300 dark:border-[#272727] bg-gray-50 dark:bg-[#272727] hover:bg-gray-100 dark:hover:bg-[#3f3f3f] rounded-r-full transition-colors duration-200 text-gray-700 dark:text-white" >
            <CiSearch size={"20px"} />
          </button>
        </form>

        <button aria-label="Search with voice" className="ml-3 shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-[#272727] hover:bg-gray-200 dark:hover:bg-[#3f3f3f] transition-colors duration-200 text-gray-700 dark:text-white">
          <IoMdMic size={"18px"} />
        </button>
      </div>

      <div className="flex items-center gap-1 sm:gap-1 shrink-0">
        
        <div className="hidden sm:flex items-center gap-1">
          <button aria-label="Create" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-200 text-gray-700 dark:text-white" >
            <RiVideoAddLine className="text-xl" />
          </button>
          <button
            aria-label="Notifications"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-200 text-gray-700 dark:text-white" >
            <AiOutlineBell className="text-xl" />
          </button>
        </div>

        {isSearchOpen ? (
          <div className="flex items-center gap-2 flex-1 sm:hidden animate-[slideIn_0.25s_ease-out]">
            <button onClick={handleBack} aria-label="Back"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-200 flex-shrink-0 text-gray-900 dark:text-white">
              <FiArrowLeft className="text-xl" />
            </button>

            <form onSubmit={handleSearch} className="flex-1 min-w-0">
              <div className="flex items-center h-10 w-full bg-gray-100 dark:bg-[#272727] rounded-full border border-gray-300 dark:border-[#3f3f3f] focus-within:border-blue-500 focus-within:shadow-[inset_0_0_0_1px_#1c62b9] transition-all duration-200">
                <input ref={searchInputRef} type="text" placeholder="Search" value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 min-w-0 h-full px-4 bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400" />
                <button type="submit" className="flex-shrink-0 h-full px-3 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors duration-200" >
                  <CiSearch size={"20px"} />
                </button>
              </div>
            </form>

            <div className="cursor-pointer flex-shrink-0">
              {user?.profileImage ? (
                <img  src={user.profileImage}  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover"/>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#272727] flex items-center justify-center">
                  <FiUser className="text-gray-600 dark:text-gray-400 text-lg" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <button onClick={() => setIsSearchOpen(true)} aria-label="Search"
              className="sm:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-200 text-gray-900 dark:text-white" >
              <CiSearch size={"22px"} />
            </button>
            
            <div className="relative" ref={profileDropdownRef}>
              <div  onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="cursor-pointer flex-shrink-0" >
                {user?.profileImage ? (
                  <img  src={user.profileImage}  alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#272727] flex items-center justify-center hover:bg-gray-300 dark:hover:bg-[#3f3f3f] transition-colors">
                    <FiUser className="text-gray-600 dark:text-gray-400 text-lg" />
                  </div>
                )}
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1f1f1f] rounded-xl shadow-lg border border-gray-200 dark:border-[#272727] overflow-hidden animate-[fadeIn_0.15s_ease-out] z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-[#272727]">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                      
                      <div className="py-1">
                        <button  onClick={() => {
                            setLightTheme();
                            setIsProfileOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${ theme === 'light' ? 'text-gray-900 dark:text-white bg-gray-50 dark:bg-[#272727] font-medium' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#272727]' }`} >
                          Light Theme
                        </button>
                        
                        <button onClick={() => {
                            setDarkTheme();
                            setIsProfileOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 
                            ${ theme === 'dark' ? 'text-gray-900 dark:text-white bg-gray-50 dark:bg-[#272727] font-medium' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#272727]' }`} >
                          Dark Theme
                        </button>

                        <hr className="my-1 border-gray-200 dark:border-[#272727]" />

                        <button onClick={handleLogout}  className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150">
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="py-1">
                      <button onClick={() => {
                          setIsProfileOpen(false);
                          navigate('/login'); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-150" >
                        Sign In
                      </button>
                      
                      <button onClick={() => { setIsProfileOpen(false); navigate('/signup'); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#272727] transition-colors duration-150" >
                        Sign Up
                      </button>

                      <hr className="my-1 border-gray-200 dark:border-[#272727]" />

                      <button
                        onClick={() => {
                          setLightTheme();
                          setIsProfileOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${theme === 'light'
                            ? 'text-gray-900 dark:text-white bg-gray-50 dark:bg-[#272727] font-medium'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#272727]'
                        }`} >
                        Light Theme
                      </button>
                      
                      <button
                        onClick={() => {
                          setDarkTheme();
                          setIsProfileOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                          theme === 'dark'
                            ? 'text-gray-900 dark:text-white bg-gray-50 dark:bg-[#272727] font-medium'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#272727]'
                        }`}>
                        Dark Theme
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;