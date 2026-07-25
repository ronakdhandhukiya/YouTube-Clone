import React from 'react';

function EmptyState({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-6xl text-gray-300 dark:text-gray-600 mb-4 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
        {description}
      </p>
    </div>
  );
}

export default EmptyState;