import type React from 'react';
import { EnglishIcon } from '../components/icons/subjects/EnglishIcon';
import { MathIcon } from '../components/icons/subjects/MathIcon';
import { EVSIcon } from '../components/icons/subjects/EVSIcon';
import { ArtCraftIcon } from '../components/icons/subjects/ArtCraftIcon';
import { RhymesIcon } from '../components/icons/subjects/RhymesIcon';
import { AssessmentIcon } from '../components/icons/subjects/AssessmentIcon';
import { LanguageIcon } from '../components/icons/subjects/LanguageIcon';
import { BookOpenIcon } from '../components/icons/BookOpenIcon';
import { PatternIcon } from '../components/icons/subjects/PatternIcon';
import type { IconProps } from '../components/icons/types';

interface SubjectAppearance {
  Icon: React.ComponentType<IconProps>;
  backgroundColor: string;
  iconColor: string;
}

const createAppearance = (
  Icon: React.ComponentType<IconProps>,
  backgroundColor: string,
  iconColor: string,
): SubjectAppearance => ({ Icon, backgroundColor, iconColor });

export const getSubjectAppearance = (subjectName: string): SubjectAppearance => {
  const lowerCaseName = subjectName.toLowerCase();

  if (lowerCaseName.includes('eng')) {
    return createAppearance(EnglishIcon, '#fee2e2', '#dc2626');
  }
  if (lowerCaseName.includes('math')) {
    return createAppearance(MathIcon, '#dbeafe', '#2563eb');
  }
  if (lowerCaseName.includes('evs')) {
    return createAppearance(EVSIcon, '#dcfce7', '#16a34a');
  }
  if (lowerCaseName.includes('art')) {
    return createAppearance(ArtCraftIcon, '#ffedd5', '#ea580c');
  }
  if (lowerCaseName.includes('rhymes')) {
    return createAppearance(RhymesIcon, '#ede9fe', '#7c3aed');
  }
  if (lowerCaseName.includes('assessment')) {
    return createAppearance(AssessmentIcon, '#fef9c3', '#ca8a04');
  }
  if (lowerCaseName.includes('pattern')) {
    return createAppearance(PatternIcon, '#fce7f3', '#db2777');
  }
  if (['kannada', 'hindi', 'tamil', 'telugu'].some((lang) => lowerCaseName.includes(lang))) {
    return createAppearance(LanguageIcon, '#ccfbf1', '#0f766e');
  }

  return createAppearance(BookOpenIcon, '#e2e8f0', '#334155');
};
