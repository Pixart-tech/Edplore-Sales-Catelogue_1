import React from 'react';
import { EnglishIcon } from '../components/icons/subjects/EnglishIcon';
import { MathIcon } from '../components/icons/subjects/MathIcon';
import { EVSIcon } from '../components/icons/subjects/EVSIcon';
import { ArtCraftIcon } from '../components/icons/subjects/ArtCraftIcon';
import { RhymesIcon } from '../components/icons/subjects/RhymesIcon';
import { AssessmentIcon } from '../components/icons/subjects/AssessmentIcon';
import { LanguageIcon } from '../components/icons/subjects/LanguageIcon';
import { BookOpenIcon } from '../components/icons/BookOpenIcon';
import { PatternIcon } from '../components/icons/subjects/PatternIcon';

interface SubjectAppearance {
    icon: React.ReactNode;
    bg: string;
}

export const getSubjectAppearance = (subjectName: string): SubjectAppearance => {
    const lowerCaseName = subjectName.toLowerCase();

    if (lowerCaseName.includes('eng')) {
        return {
            icon: <EnglishIcon className="h-5 w-5 text-red-600" />,
            bg: 'bg-red-100',
        };
    }
    if (lowerCaseName.includes('math')) {
        return {
            icon: <MathIcon className="h-5 w-5 text-blue-600" />,
            bg: 'bg-blue-100',
        };
    }
    if (lowerCaseName.includes('evs')) {
        return {
            icon: <EVSIcon className="h-5 w-5 text-green-600" />,
            bg: 'bg-green-100',
        };
    }
    if (lowerCaseName.includes('art')) {
        return {
            icon: <ArtCraftIcon className="h-5 w-5 text-orange-600" />,
            bg: 'bg-orange-100',
        };
    }
    if (lowerCaseName.includes('rhymes')) {
        return {
            icon: <RhymesIcon className="h-5 w-5 text-purple-600" />,
            bg: 'bg-purple-100',
        };
    }
    if (lowerCaseName.includes('assessment')) {
        return {
            icon: <AssessmentIcon className="h-5 w-5 text-yellow-500" />,
            bg: 'bg-yellow-100',
        };
    }
    if (lowerCaseName.includes('pattern')) {
        return {
            icon: <PatternIcon className="h-5 w-5 text-pink-600" />,
            bg: 'bg-pink-100',
        };
    }
    if (['kannada', 'hindi', 'tamil', 'telugu'].some(lang => lowerCaseName.includes(lang))) {
        return {
            icon: <LanguageIcon className="h-5 w-5 text-teal-600" />,
            bg: 'bg-teal-100',
        };
    }

    // Fallback icon
    return {
        icon: <BookOpenIcon className="h-5 w-5 text-slate-600" />,
        bg: 'bg-slate-100',
    };
};
