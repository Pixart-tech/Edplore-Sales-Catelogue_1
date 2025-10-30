import type { ImageSourcePropType } from 'react-native';

export type PreviewImageSource = ImageSourcePropType;
export type PreviewPdfSource = number;

export interface Book {
  name: string;
  imageAssets?: readonly PreviewImageSource[];
  pdfAsset?: PreviewPdfSource;
}

export interface StandardSubject {
  name: string;
  core: Book[];
  variations: Book[];
  addOns: Book[];
}

export interface PGSubject {
    name: string;
    books: Book[];
}

export type RegularClassName = 'PG' | 'Nursery' | 'LKG' | 'UKG';
export type ClassName = RegularClassName | 'Pre-Written';

export interface Curriculum {
  PG: PGSubject[];
  Nursery: StandardSubject[];
  LKG: StandardSubject[];
  UKG: StandardSubject[];
}

export interface PreWrittenBook {
  name: string;
  imageAssets?: readonly PreviewImageSource[];
  pdfAsset?: PreviewPdfSource;
}

export interface PreWrittenSubject {
    subjectName: string;
    books: PreWrittenBook[];
}

export interface PreWrittenClass {
    className: 'Nursery' | 'LKG' | 'UKG';
    subjects: PreWrittenSubject[];
}

export interface QuickAccessItem {
  title?: string;
  buttonLabel?: string;
  previewTitle: string;
  imageAssets?: readonly PreviewImageSource[];
  pdfAsset?: PreviewPdfSource;
}

export interface QuickAccessSection {
  title: string;
  items: QuickAccessItem[];
}
