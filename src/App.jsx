import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import PlayingVideo from "./components/PlayingVideo";
import History from "./pages/History";
import WatchLater from "./pages/WatchLater";
import LikedVideos from "./pages/LikedVideos";
import Playlists from "./pages/Playlists";
import Channel from "./pages/Channel";
import YourVideos from "./pages/YourVideos";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { SidebarProvider } from "./context/SidebarContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useAuth } from "./context/AuthProvider";

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:searchQuery" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/video/:id" element={
              <ProtectedRoute>
                <PlayingVideo />
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            } />
            <Route path="/watch-later" element={
              <ProtectedRoute>
                <WatchLater />
              </ProtectedRoute>
            } />
            <Route path="/liked" element={
              <ProtectedRoute>
                <LikedVideos />
              </ProtectedRoute>
            } />
            <Route path="/playlists" element={
              <ProtectedRoute>
                <Playlists />
              </ProtectedRoute>
            } />
            <Route path="/channel" element={
              <ProtectedRoute>
                <Channel />
              </ProtectedRoute>
            } />
            <Route path="/your-videos" element={
              <ProtectedRoute>
                <YourVideos />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;