import { createContext, useContext, useState, useEffect } from "react";
import { fetchData } from "../utils/rapidapi";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("New");
  const [error, setError] = useState(null);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const storedUser = localStorage.getItem('yt_current_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('yt_current_user');
      }
    }
  }, []);

  const fetchAlldata = async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchData(`search/?q=${query}`);
      setData(result.contents || []);
      setLoading(false);
    } catch (error) {
      console.error('API Error:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlldata(value);
  }, [value]);

  const register = (userData) => {
    setAuthLoading(true);
    
    try {
      const users = JSON.parse(localStorage.getItem('yt_users') || '[]');
      
      const emailExists = users.some(u => u.email === userData.email);
      if (emailExists) {
        throw new Error('Email already registered');
      }
      
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        profileImage: userData.profileImage || null,
        joinedDate: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('yt_users', JSON.stringify(users));
      
      const userDataKey = `yt_user_data_${newUser.id}`;
      localStorage.setItem(userDataKey, JSON.stringify({
        history: [],
        watchLater: [],
        likedVideos: [],
        playlists: []
      }));
      
      setAuthLoading(false);
      return { success: true, user: newUser };
      
    } catch (error) {
      setAuthLoading(false);
      return { success: false, error: error.message };
    }
  };

  const login = (email, password) => {
    setAuthLoading(true);
    
    try {
      const users = JSON.parse(localStorage.getItem('yt_users') || '[]');
      
      const foundUser = users.find(u => 
        u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      setUser(foundUser);
      
      const { password: _, ...userWithoutPassword } = foundUser;
      localStorage.setItem('yt_current_user', JSON.stringify(userWithoutPassword));
      
      setAuthLoading(false);
      return { success: true, user: foundUser };
      
    } catch (error) {
      setAuthLoading(false);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('yt_current_user');
  };

  const valueToShare = {
    user,
    authLoading,
    register,
    login,
    logout,
    isLoggedIn: !!user,
    loading,
    data,
    value,
    setValue,
    error,
    fetchData: () => fetchAlldata(value)
  };

  return (
    <AuthContext.Provider value={valueToShare}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};