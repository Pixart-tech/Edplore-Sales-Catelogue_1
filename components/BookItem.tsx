import React from 'react';
import type { Book } from '../types';
import { EyeIcon } from './icons/EyeIcon';

interface BookItemProps {
    book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
    return (
        <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-700 text-sm font-medium pr-2">{book.name}</p>
            <a
                href={book.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                aria-label={`View PDF for ${book.name}`}
            >
                <EyeIcon className="h-4 w-4 sm:mr-1.5" />
                <span className="hidden sm:inline">View</span>
            </a>
        </div>
    );
};

export default BookItem;