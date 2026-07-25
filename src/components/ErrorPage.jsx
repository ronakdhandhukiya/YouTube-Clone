import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

function ErrorPage({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#0f0f0f] pt-14 px-4 transition-colors duration-300">
      <div className="text-center max-w-md">
        <div className="text-6xl text-gray-400 dark:text-gray-500 mb-6">
          <FiAlertTriangle className="mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          API Limit Reached
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The API quota has been exhausted. Please try again later.
        </p>
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;