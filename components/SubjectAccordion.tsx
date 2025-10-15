import React from 'react';
import type { StandardSubject, Book } from '../types';
import { CoreIcon } from './icons/CoreIcon';
import { VariationIcon } from './icons/VariationIcon';
import { AddOnIcon } from './icons/AddOnIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import BookItem from './BookItem';
import { getSubjectAppearance } from '../utils/subjectIcons';

interface SubjectAccordionProps {
  subject: StandardSubject;
  isOpen: boolean;
  onToggle: () => void;
}

interface DetailListProps {
  title: string;
  items: Book[];
  icon: React.ReactNode;
}

const DetailList: React.FC<DetailListProps> = ({ title, items, icon }) => {
    if (items.length === 0) return null;
    return (
        <div>
          <div className="flex items-center mb-3">
            {icon}
            <h3 className="text-base font-semibold text-gray-700 ml-2.5">{title}</h3>
          </div>
          <div className="space-y-2">
              {items.map((book, index) => (
                  <BookItem key={index} book={book} />
              ))}
          </div>
        </div>
    );
};

const SubjectAccordion: React.FC<SubjectAccordionProps> = ({ subject, isOpen, onToggle }) => {
  const { icon, bg } = getSubjectAppearance(subject.name);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-inset transition-colors"
        aria-expanded={isOpen}
        aria-controls={`content-${subject.name.replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center space-x-4">
          <div className={`flex-shrink-0 h-10 w-10 ${bg} rounded-full flex items-center justify-center`}>
            {icon}
          </div>
          <div>
            <h2 className="text-md sm:text-lg font-semibold text-gray-800">{subject.name}</h2>
          </div>
        </div>
        <ChevronDownIcon
          className={`h-6 w-6 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        id={`content-${subject.name.replace(/\s+/g, '-')}`}
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DetailList
                title="Core"
                items={subject.core}
                icon={<CoreIcon />}
                />
                <DetailList
                title="Variations"
                items={subject.variations}
                icon={<VariationIcon />}
                />
                <DetailList
                title="Add ons"
                items={subject.addOns}
                icon={<AddOnIcon />}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectAccordion;
