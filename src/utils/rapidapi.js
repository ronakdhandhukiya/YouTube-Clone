import axios from "axios";

const API_KEY = import.meta.env.VITE_RAPID_API_KEY;

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "youtube138.p.rapidapi.com",
  },
};

export const fetchData = async (url) => {
  const cacheKey = `yt_${url}`;

  
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    console.log("Loaded from localStorage");
    return JSON.parse(cached);
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);

    localStorage.setItem(cacheKey, JSON.stringify(data));

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};