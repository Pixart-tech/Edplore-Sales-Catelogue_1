import React from 'react';
import type { ClassName } from '../types';

interface ClassTabsProps {
  classes: ClassName[];
  activeClass: ClassName;
  setActiveClass: (className: ClassName) => void;
}

const ClassTabs: React.FC<ClassTabsProps> = ({ classes, activeClass, setActiveClass }) => {
  return (
    <nav className="flex space-x-1 sm:space-x-2 bg-slate-100 p-1 rounded-lg">
      {classes.map((className) => (
        <button
          key={className}
          onClick={() => setActiveClass(className)}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-semibold rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
            ${
              activeClass === className
                ? 'bg-white text-indigo-600 shadow'
                : 'text-slate-600 hover:bg-slate-200'
            }
          `}
        >
          {className}
        </button>
      ))}
    </nav>
  );
};

export default ClassTabs;