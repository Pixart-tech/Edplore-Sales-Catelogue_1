import type { SvgProps } from 'react-native-svg';
import type { ImageSourcePropType } from 'react-native';

export type IconProps = SvgProps & {
  size?: number;
  color?: string;
};

export type PreviewImageSource = ImageSourcePropType | number;

export type ClassName = 'PG' | 'Nursery' | 'LKG' | 'UKG' | 'Pre-Written';
export type RegularClassName = Exclude<ClassName, 'Pre-Written'>;

export interface Book {
  name: string;
  imageAssets?: readonly PreviewImageSource[];
}

export interface PGSubject {
  name: string;
  books: Book[];
}

export interface Subject {
  name: string;
  core: { name: string }[];
  variations: { name: string }[];
  addOns: { name: string }[];
}

export interface Curriculum {
  PG: PGSubject[];
  Nursery: Subject[];
  LKG: Subject[];
  UKG: Subject[];
}

export interface PreWrittenBook {
  name: string;
}

export interface PreWrittenSubject {
  subjectName: string;
  books: PreWrittenBook[];
}

export interface PreWrittenClass {
  className: string;
  subjects: PreWrittenSubject[];
}