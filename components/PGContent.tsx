import React from 'react';
import type { PGSubject } from '../types';
import { getSubjectAppearance } from '../utils/subjectIcons';
import { EyeIcon } from './icons/EyeIcon';

interface PGContentProps {
  subjects: PGSubject[];
}

const PGContent: React.FC<PGContentProps> = ({ subjects }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6">
      <div className="space-y-3">
        {subjects.map((subject) => {
          // This view assumes each PG subject has exactly one book.
          // If there are no books, we don't render the row.
          if (subject.books.length === 0) {
            return null;
          }
          const book = subject.books[0];
          const { icon, bg } = getSubjectAppearance(subject.name);

          return (
            <div 
              key={subject.name} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 h-10 w-10 ${bg} rounded-full flex items-center justify-center`}>
                  {icon}
                </div>
                <h2 className="ml-4 text-md font-semibold text-gray-800">{subject.name}</h2>
              </div>
              <a
                href={book.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                aria-label={`View PDF for ${subject.name}`}
              >
                <EyeIcon className="h-5 w-5 sm:mr-1.5" />
                <span className="hidden sm:inline">View</span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PGContent;
