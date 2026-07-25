import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthProvider';
import { getUserData, saveUserData } from '../utils/storage';
import VideoCard from '../components/VideoCard';
import SectionHeader from '../components/SectionHeader';
import EmptyState from '../components/EmptyState';
import { IoMdList, IoMdAdd, IoMdTrash, IoMdCreate } from 'react-icons/io';
import { useSidebar } from '../context/SidebarContext';

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);
  const [editingPlaylistId, setEditingPlaylistId] = useState(null);
  const [editName, setEditName] = useState('');
  const { isOpen } = useSidebar();
  const { user } = useAuth();

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = () => {
    if (!user) return;
    const data = getUserData(user.id);
    setPlaylists(data.playlists || []);
  };

  const handleCreatePlaylist = () => {
    if (!user) return;
    if (newPlaylistName.trim()) {
      const data = getUserData(user.id);
      const newPlaylist = {
        id: Date.now().toString(),
        name: newPlaylistName.trim(),
        videos: [],
        createdAt: new Date().toISOString()
      };
      data.playlists = [newPlaylist, ...(data.playlists || [])];
      saveUserData(user.id, data);
      setPlaylists(data.playlists);
      setNewPlaylistName('');
      setShowCreateModal(false);
    }
  };

  const handleDeletePlaylist = (playlistId) => {
    if (!user) return;
    if (window.confirm('Delete this playlist?')) {
      const data = getUserData(user.id);
      data.playlists = (data.playlists || []).filter(p => p.id !== playlistId);
      saveUserData(user.id, data);
      setPlaylists(data.playlists);
      if (expandedPlaylist === playlistId) {
        setExpandedPlaylist(null);
      }
    }
  };

  const handleRenamePlaylist = (playlistId) => {
    if (!user) return;
    if (editName.trim()) {
      const data = getUserData(user.id);
      data.playlists = (data.playlists || []).map(p =>
        p.id === playlistId ? { ...p, name: editName.trim() } : p );
      saveUserData(user.id, data);
      setPlaylists(data.playlists);
      setEditingPlaylistId(null);
      setEditName('');
    }
  };

  const handleRemoveVideo = (playlistId, videoId) => {
    if (!user) return;
    const data = getUserData(user.id);
    data.playlists = (data.playlists || []).map(p =>
      p.id === playlistId ? { ...p, videos: p.videos.filter(v => v.videoId !== videoId) }: p);
    saveUserData(user.id, data);
    setPlaylists(data.playlists);
  };

  if (playlists.length === 0) {
    return (
      <>
        <Sidebar />
        <div className={`min-h-screen bg-white dark:bg-[#0f0f0f] pt-14 sm:pt-16 transition-all duration-300 ${isOpen ? 'lg:ml-60' : 'lg:ml-0' }`}>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <EmptyState icon={<IoMdList />}
              title="No playlists created"
              description="Create your first playlist" />
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors">
                <IoMdAdd /> Create Playlist
              </button>
            </div>
          </div>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-[#1f1f1f] rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                Create Playlist
              </h3>
              <input  type="text" placeholder="Playlist name..."
               value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-[#272727] bg-white dark:bg-[#121212] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-blue-500"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreatePlaylist();  }} />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewPlaylistName('');
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-lg transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleCreatePlaylist}
                  disabled={!newPlaylistName.trim()}
                  className={`px-4 py-2 rounded-lg text-white transition-colors ${newPlaylistName.trim()
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-300 dark:bg-[#272727] cursor-not-allowed'
                    }`} >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className={`min-h-screen bg-white dark:bg-[#0f0f0f] pt-14 sm:pt-16 transition-all duration-300 ${isOpen ? 'lg:ml-60' : 'lg:ml-0' }`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <SectionHeader title="Playlists" count={playlists.length}
            actionText="Create Playlist"
            onAction={() => setShowCreateModal(true)} />

          <div className="space-y-6">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="border border-gray-200 dark:border-[#272727] rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#181818] hover:bg-gray-100 dark:hover:bg-[#272727] cursor-pointer transition-colors"
                  onClick={() => setExpandedPlaylist(expandedPlaylist === playlist.id ? null : playlist.id)} >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-[#272727] rounded-lg flex items-center justify-center">
                      <IoMdList className="text-2xl text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      {editingPlaylistId === playlist.id ? (
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <input type="text" value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="px-3 py-1 border border-gray-300 dark:border-[#272727] bg-white dark:bg-[#121212] text-gray-900 dark:text-white rounded-lg text-sm focus:outline-none focus:border-blue-500"
                            autoFocus />
                          <button onClick={() => handleRenamePlaylist(playlist.id)}
                            className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                            Save
                          </button>
                          <button onClick={() => setEditingPlaylistId(null)}
                            className="px-3 py-1 bg-gray-200 dark:bg-[#272727] text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-[#3f3f3f] transition-colors" >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <h3 className="font-medium text-gray-900 dark:text-white">{playlist.name}</h3>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400">{playlist.videos.length} videos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!editingPlaylistId && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation();
                            setEditingPlaylistId(playlist.id);
                            setEditName(playlist.name); }}
                          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#3f3f3f] transition-colors" >
                          <IoMdCreate className="text-gray-600 dark:text-gray-400" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation();
                            handleDeletePlaylist(playlist.id); }}
                          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#3f3f3f] transition-colors" >
                          <IoMdTrash className="text-red-500" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {expandedPlaylist === playlist.id && (
                  <div className="p-4 border-t border-gray-200 dark:border-[#272727]">
                    {playlist.videos.length === 0 ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                        No videos in this playlist
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {playlist.videos.map((video) => (
                          <div key={video.videoId} className="relative group">
                            <VideoCard video={video} />
                            <button onClick={() => handleRemoveVideo(playlist.id, video.videoId)}
                              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100">
                              <IoMdTrash className="text-sm" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {showCreateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white dark:bg-[#1f1f1f] rounded-xl p-6 max-w-md w-full mx-4">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                  Create Playlist
                </h3>
                <input type="text" placeholder="Playlist name..." value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-[#272727] bg-white dark:bg-[#121212] text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-blue-500"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreatePlaylist();
                  }} />
                <div className="flex justify-end gap-3 mt-4">
                  <button onClick={() => { setShowCreateModal(false); setNewPlaylistName(''); }}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-lg transition-colors" >
                    Cancel
                  </button>
                  <button onClick={handleCreatePlaylist}
                    disabled={!newPlaylistName.trim()}
                    className={`px-4 py-2 rounded-lg text-white transition-colors ${newPlaylistName.trim() ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-300 dark:bg-[#272727] cursor-not-allowed'
                      }`} >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Playlists;