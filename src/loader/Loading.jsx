import React from 'react';

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-gray-200 dark:border-[#272727] border-t-red-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;