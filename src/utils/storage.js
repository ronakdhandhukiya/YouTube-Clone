// LocalStorage utility functions

// Helper to get current user ID from localStorage
const getCurrentUserId = () => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return null;
  try {
    return JSON.parse(user).id;
  } catch {
    return null;
  }
};

// Get user-specific data key
const getUserDataKey = (userId) => {
  if (!userId) {
    const currentUser = getCurrentUserId();
    if (!currentUser) return null;
    userId = currentUser;
  }
  return `yt_user_data_${userId}`;
};

// Get user's data
export const getUserData = (userId) => {
  const key = getUserDataKey(userId);
  if (!key) return null;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : { history: [], watchLater: [], likedVideos: [], playlists: [] };
  } catch {
    return { history: [], watchLater: [], likedVideos: [], playlists: [] };
  }
};

// Save user's data
export const saveUserData = (userId, data) => {
  const key = getUserDataKey(userId);
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(data));
};

// GENERIC STORAGE FUNCTIONS
 
export const getFromStorage = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error getting ${key}:`, error);
    return defaultValue;
  }
};

export const setToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error setting ${key}:`, error);
  }
};

// HISTORY FUNCTIONS - Using user-specific storage

export const getHistory = () => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return [];
  try {
    const userId = JSON.parse(user).id;
    const data = getUserData(userId);
    return data.history || [];
  } catch {
    return [];
  }
};

export const addToHistory = (video) => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return [];
  
  try {
    const userId = JSON.parse(user).id;
    const data = getUserData(userId);
    const history = data.history || [];
    const filtered = history.filter(item => item.videoId !== video.videoId);
    const updated = [video, ...filtered];
    data.history = updated;
    saveUserData(userId, data);
    return updated;
  } catch {
    return [];
  }
};

export const removeFromHistory = (videoId) => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return [];
  
  try {
    const userId = JSON.parse(user).id;
    const data = getUserData(userId);
    data.history = (data.history || []).filter(item => item.videoId !== videoId);
    saveUserData(userId, data);
    return data.history;
  } catch {
    return [];
  }
};

export const clearHistory = () => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return [];
  
  try {
    const userId = JSON.parse(user).id;
    const data = getUserData(userId);
    data.history = [];
    saveUserData(userId, data);
    return [];
  } catch {
    return [];
  }
};


// WATCH LATER FUNCTIONS


export const getWatchLater = () => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return [];
  
  try {
    const userId = JSON.parse(user).id;
    const data = getUserData(userId);
    return data.watchLater || [];
  } catch {
    return [];
  }
};

export const toggleWatchLater = (video) => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return { updated: [], added: false };
  
  try {
    const userId = JSON.parse(user).id;
    const data = getUserData(userId);
    const watchLater = data.watchLater || [];
    const exists = watchLater.some(item => item.videoId === video.videoId);
    
    if (exists) {
      data.watchLater = watchLater.filter(item => item.videoId !== video.videoId);
      saveUserData(userId, data);
      return { updated: data.watchLater, added: false };
    } else {
      data.watchLater = [video, ...watchLater];
      saveUserData(userId, data);
      return { updated: data.watchLater, added: true };
    }
  } catch {
    return { updated: [], added: false };
  }
};

export const removeFromWatchLater = (videoId) => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return [];
  
  try {
    const userId = JSON.parse(user).id;
    const data = getUserData(userId);
    data.watchLater = (data.watchLater || []).filter(item => item.videoId !== videoId);
    saveUserData(userId, data);
    return data.watchLater;
  } catch {
    return [];
  }
};


// LIKED VIDEOS FUNCTIONS


export const getLikedVideos = () => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return [];
  
  try {
    const userId = JSON.parse(user).id;
    const data = getUserData(userId);
    return data.likedVideos || [];
  } catch {
    return [];
  }
};

export const toggleLikedVideo = (video) => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return { updated: [], added: false };
  
  try {
    const userId = JSON.parse(user).id;
    const data = getUserData(userId);
    const likedVideos = data.likedVideos || [];
    const exists = likedVideos.some(item => item.videoId === video.videoId);
    
    if (exists) {
      data.likedVideos = likedVideos.filter(item => item.videoId !== video.videoId);
      saveUserData(userId, data);
      return { updated: data.likedVideos, added: false };
    } else {
      data.likedVideos = [video, ...likedVideos];
      saveUserData(userId, data);
      return { updated: data.likedVideos, added: true };
    }
  } catch {
    return { updated: [], added: false };
  }
};

export const removeFromLiked = (videoId) => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return [];
  
  try {
    const userId = JSON.parse(user).id;
    const data = getUserData(userId);
    data.likedVideos = (data.likedVideos || []).filter(item => item.videoId !== videoId);
    saveUserData(userId, data);
    return data.likedVideos;
  } catch {
    return [];
  }
};

// PLAYLISTS FUNCTIONS

export const getPlaylists = () => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return [];
  
  try {
    const userId = JSON.parse(user).id;
    const data = getUserData(userId);
    return data.playlists || [];
  } catch {
    return [];
  }
};

export const createPlaylist = (name) => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return [];
  
  try {
    const userId = JSON.parse(user).id;
    const data = getUserData(userId);
    const playlists = data.playlists || [];
    
    const newPlaylist = {
      id: Date.now().toString(),
      name: name,
      videos: [],
      createdAt: new Date().toISOString()
    };
    
    data.playlists = [newPlaylist, ...playlists];
    saveUserData(userId, data);
    return data.playlists;
  } catch {
    return [];
  }
};

export const deletePlaylist = (playlistId) => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return [];
  
  try {
    const userId = JSON.parse(user).id;
    const data = getUserData(userId);
    data.playlists = (data.playlists || []).filter(p => p.id !== playlistId);
    saveUserData(userId, data);
    return data.playlists;
  } catch {
    return [];
  }
};

export const renamePlaylist = (playlistId, newName) => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return [];
  
  try {
    const userId = JSON.parse(user).id;
    const data = getUserData(userId);
    data.playlists = (data.playlists || []).map(p => 
      p.id === playlistId ? { ...p, name: newName } : p
    );
    saveUserData(userId, data);
    return data.playlists;
  } catch {
    return [];
  }
};

export const addVideoToPlaylist = (playlistId, video) => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return [];
  
  try {
    const userId = JSON.parse(user).id;
    const data = getUserData(userId);
    const playlists = data.playlists || [];
    
    data.playlists = playlists.map(p => {
      if (p.id === playlistId) {
        const exists = p.videos.some(v => v.videoId === video.videoId);
        if (!exists) {
          return { ...p, videos: [video, ...p.videos] };
        }
      }
      return p;
    });
    
    saveUserData(userId, data);
    return data.playlists;
  } catch {
    return [];
  }
};

export const removeVideoFromPlaylist = (playlistId, videoId) => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) return [];
  
  try {
    const userId = JSON.parse(user).id;
    const data = getUserData(userId);
    const playlists = data.playlists || [];
    
    data.playlists = playlists.map(p => 
      p.id === playlistId ? 
      { ...p, videos: p.videos.filter(v => v.videoId !== videoId) } : p );
    
    saveUserData(userId, data);
    return data.playlists;
  } catch {
    return [];
  }
};

// CHANNEL DATA FUNCTIONS

export const getChannelData = () => {
  const user = localStorage.getItem('yt_current_user');
  if (!user) {
    return {
      channelName: 'My Channel',
      joinedDate: new Date().toISOString(),
      totalVideos: 0,
      totalLikes: 0
    };
  }
  
  try {
    const userId = JSON.parse(user).id;
    const userData = getUserData(userId);
    return {
      channelName: JSON.parse(user).name || 'My Channel',
      joinedDate: new Date().toISOString(),
      totalVideos: 0,
      totalLikes: 0
    };
  } catch {
    return {
      channelName: 'My Channel',
      joinedDate: new Date().toISOString(),
      totalVideos: 0,
      totalLikes: 0
    };
  }
};

export const setChannelData = (data) => {
  
  return data;
};