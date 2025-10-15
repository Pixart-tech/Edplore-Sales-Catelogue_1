import React from 'react';
import type { PreWrittenClass } from '../types';
import { getSubjectAppearance } from '../utils/subjectIcons';
import { EyeIcon } from './icons/EyeIcon';

interface PreWrittenContentProps {
  data: PreWrittenClass[];
}

const PreWrittenContent: React.FC<PreWrittenContentProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {data.map((classData) => (
        <div key={classData.className} className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-bold text-indigo-700">{classData.className}</h2>
          </div>
          <div className="p-4 md:p-6 space-y-3">
            {classData.subjects.map((subject) => {
              // This view assumes each pre-written subject has exactly one book.
              if (subject.books.length === 0) {
                return null;
              }
              const book = subject.books[0];
              const { icon, bg } = getSubjectAppearance(subject.subjectName);

              return (
                <div 
                  key={subject.subjectName} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-10 w-10 ${bg} rounded-full flex items-center justify-center`}>
                      {icon}
                    </div>
                    <h3 className="ml-4 text-md font-semibold text-gray-800">{subject.subjectName}</h3>
                  </div>
                  <a
                    href={book.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                    aria-label={`View PDF for ${subject.subjectName}`}
                  >
                    <EyeIcon className="h-5 w-5 sm:mr-1.5" />
                    <span className="hidden sm:inline">View</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreWrittenContent;
