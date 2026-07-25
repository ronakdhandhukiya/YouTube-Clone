import React from 'react';

function SectionHeader({ title, count, actionText, onAction }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white transition-colors duration-300">
          {title}
        </h2>
        {count !== undefined && (
          <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            ({count})
          </span>
        )}
      </div>
      {actionText && onAction && (
        <button onClick={onAction} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-300" >
          {actionText}
        </button>
      )}
    </div>
  );
}

export default SectionHeader;