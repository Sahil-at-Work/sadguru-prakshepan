import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Prakshepan. All rights reserved.</p>
          <p className="mt-1">
            A comprehensive examination system for multiple-choice questions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;