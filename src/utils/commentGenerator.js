import { users } from "../data/users";
import { comments } from "../data/comments";

const getAvatar = () => {
  const random = Math.floor(Math.random() * 70) + 1;
  return `https://i.pravatar.cc/150?img=${random}`;
};


const getLikes = () => {
  return Math.floor(Math.random() * 10000) + 10;
};

const getTime = () => {
  const times = [
    "Just now",
    "2 minutes ago",
    "10 minutes ago",
    "35 minutes ago",
    "1 hour ago",
    "3 hours ago",
    "8 hours ago",
    "Yesterday",
    "2 days ago",
    "5 days ago",
    "1 week ago",
    "2 weeks ago",
    "1 month ago",
    "2 months ago",
    "5 months ago",
    "1 year ago",
  ];

  return times[Math.floor(Math.random() * times.length)];
};

// Shuffle Array
const shuffle = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

// Generate Comments
export const generateComments = (count = 20) => {
  const randomUsers = shuffle(users);
  const randomComments = shuffle(comments);

  const data = [];

  for (let i = 0; i < count; i++) {
    data.push({
      id: Date.now() + i,
      user: randomUsers[i % randomUsers.length].name,
      verified: randomUsers[i % randomUsers.length].verified,
      avatar: getAvatar(),
      comment: randomComments[i % randomComments.length],
      likes: getLikes(),
      time: getTime(),
      replies: [],
    });
  }

  return data;
};

// Get Comments for a Video
export const getVideoComments = (videoId) => {
  const key = `comments_${videoId}`;

  const storedComments = localStorage.getItem(key);

  if (storedComments) {
    return JSON.parse(storedComments);
  }

  const generatedComments = generateComments(20);

  localStorage.setItem(key, JSON.stringify(generatedComments));

  return generatedComments;
};

// Save Comments
export const saveVideoComments = (videoId, comments) => {
  localStorage.setItem(
    `comments_${videoId}`,
    JSON.stringify(comments)
  );
};