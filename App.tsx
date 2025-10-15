import React, { useState } from 'react';
import { CURRICULUM_DATA, PRE_WRITTEN_DATA } from './constants';
import type { ClassName, RegularClassName } from './types';
import ClassTabs from './components/ClassTabs';
import SubjectAccordion from './components/SubjectAccordion';
import PreWrittenContent from './components/PreWrittenContent';
import PGContent from './components/PGContent';

const App: React.FC = () => {
  const classNames: ClassName[] = ['PG', 'Nursery', 'LKG', 'UKG', 'Pre-Written'];
  const [activeClass, setActiveClass] = useState<ClassName>(classNames[0]);
  const [openSubjectIndex, setOpenSubjectIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenSubjectIndex(openSubjectIndex === index ? null : index);
  };
  
  const renderContent = () => {
    if (activeClass === 'Pre-Written') {
      return <PreWrittenContent data={PRE_WRITTEN_DATA} />;
    }
    
    if (activeClass === 'PG') {
      return <PGContent subjects={CURRICULUM_DATA.PG} />;
    }

    // For Nursery, LKG, UKG
    const activeClassData = CURRICULUM_DATA[activeClass as Exclude<RegularClassName, 'PG'>];
    return (
      <div className="space-y-3">
        {activeClassData.map((subject, index) => (
          <SubjectAccordion
            key={`${activeClass}-${subject.name}-${index}`}
            subject={subject}
            isOpen={openSubjectIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-2 py-3 sm:px-4 sm:py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-3 sm:mb-0">
            <div className="bg-indigo-600 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Curriculum Preview</h1>
          </div>
          <ClassTabs
            classes={classNames}
            activeClass={activeClass}
            setActiveClass={(className) => {
              setActiveClass(className);
              setOpenSubjectIndex(null); // Reset open accordion on class change
            }}
          />
        </div>
      </header>
      
      <main className="container mx-auto p-2 sm:p-4 md:p-6">
        {renderContent()}
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Curriculum data for educational purposes.</p>
      </footer>
    </div>
  );
};

export default App;