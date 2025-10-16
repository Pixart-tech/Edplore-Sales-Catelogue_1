export interface Book {
  name: string;
  pdfUrl: string;
  pdfAsset?: number;
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
    pdfUrl: string;
}

export interface PreWrittenSubject {
    subjectName: string;
    books: PreWrittenBook[];
}

export interface PreWrittenClass {
    className: 'Nursery' | 'LKG' | 'UKG';
    subjects: PreWrittenSubject[];
}
