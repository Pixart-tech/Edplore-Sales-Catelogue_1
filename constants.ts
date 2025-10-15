import type { Curriculum, PreWrittenClass } from './types';

export const CURRICULUM_DATA: Curriculum = {
  PG: [
    {
      name: 'English',
      books: [{ name: 'Pre-writing Strokes', pdfUrl: '#' }],
    },
    {
      name: 'Maths',
      books: [{ name: 'Pre-math Concepts', pdfUrl: '#' }],
    },
    {
      name: 'EVS',
      books: [{ name: 'Myself & My Surroundings', pdfUrl: '#' }],
    },
    {
      name: 'Art & Craft',
      books: [{ name: 'Colouring & Craft Activities', pdfUrl: '#' }],
    },
    {
      name: 'Pattern',
      books: [{ name: 'Pattern Writing Book', pdfUrl: '#' }],
    },
    {
      name: 'Rhymes & Stories',
      books: [{ name: 'Collection of Rhymes & Stories', pdfUrl: '#' }],
    },
  ],
  Nursery: [
    {
      name: 'Eng skill book',
      core: [{ name: 'ABCD caps', pdfUrl: '#' }],
      variations: [
        { name: 'ABCD caps & small', pdfUrl: '#' },
        { name: 'ABCD small', pdfUrl: '#' },
        { name: 'SATPIN small', pdfUrl: '#' },
        { name: 'LTI caps', pdfUrl: '#' },
        { name: 'Jolly phonics', pdfUrl: '#' },
      ],
      addOns: [],
    },
    {
      name: 'Eng work book',
      core: [{ name: 'ABCD caps', pdfUrl: '#' }],
      variations: [
        { name: 'ABCD caps & small', pdfUrl: '#' },
        { name: 'ABCD small', pdfUrl: '#' },
        { name: 'SATPIN small', pdfUrl: '#' },
        { name: 'LTI caps', pdfUrl: '#' },
      ],
      addOns: [],
    },
    {
      name: 'Math skill',
      core: [{ name: '1-20', pdfUrl: '#' }],
      variations: [],
      addOns: [{ name: '21-50', pdfUrl: '#' }],
    },
    {
      name: 'Math work book',
      core: [{ name: '1-20', pdfUrl: '#' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'EVS',
      core: [{ name: 'default', pdfUrl: '#' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Assessment',
      core: [{ name: 'annual', pdfUrl: '#' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Rhymes & stories',
      core: [{ name: 'Customisable but default version is there', pdfUrl: '#' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Art & craft',
      core: [{ name: 'default', pdfUrl: '#' }],
      variations: [],
      addOns: [],
    },
  ],
  LKG: [
    {
      name: 'Eng skill book',
      core: [{ name: 'small + vowels', pdfUrl: '#' }],
      variations: [{ name: 'caps + vowels', pdfUrl: '#' }],
      addOns: [],
    },
    {
      name: 'Eng work book',
      core: [{ name: 'small + vowels', pdfUrl: '#' }],
      variations: [{ name: 'caps + vowels', pdfUrl: '#' }],
      addOns: [],
    },
    {
      name: 'Math skill',
      core: [{ name: '1-50 and 1-10 NN', pdfUrl: '#' }],
      variations: [{ name: '1-50 & 1-10 NN (tens and ones format)', pdfUrl: '#' }],
      addOns: [{ name: '51-100', pdfUrl: '#' }],
    },
    {
      name: 'Math work book',
      core: [{ name: '1-50 and 1-10 NN', pdfUrl: '#' }],
      variations: [{ name: '1-50 & 1-10 NN (tens and ones format)', pdfUrl: '#' }],
      addOns: [],
    },
    {
      name: 'EVS',
      core: [{ name: 'default', pdfUrl: '#' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Assessment',
      core: [{ name: 'annual', pdfUrl: '#' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Rhymes & stories',
      core: [{ name: 'Customisable but default version is there', pdfUrl: '#' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Art & craft',
      core: [{ name: 'default', pdfUrl: '#' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Kannada',
      core: [{ name: 'Swara V1', pdfUrl: '#' }],
      variations: [{ name: 'Swara V2', pdfUrl: '#' }],
      addOns: [],
    },
    {
        name: 'Hindi',
        core: [{ name: 'Swara V1', pdfUrl: '#' }],
        variations: [{ name: 'Swara V2', pdfUrl: '#' }],
        addOns: [],
    },
    {
        name: 'Tamil',
        core: [{ name: 'Swara V1', pdfUrl: '#' }],
        variations: [{ name: 'Swara V2', pdfUrl: '#' }],
        addOns: [],
    },
  ],
  UKG: [
    {
      name: 'Eng skill book',
      core: [{ name: 'without cursive+ long vowels + blends + diagraphs + simple sentences', pdfUrl: '#' }],
      variations: [],
      addOns: [{ name: 'Cursive book', pdfUrl: '#' }],
    },
    {
      name: 'Eng work book',
      core: [{ name: 'without cursive+ long vowels + blends + diagraphs + simple sentences', pdfUrl: '#' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Math skill',
      core: [{ name: '1-100 and 1-100 number names', pdfUrl: '#' }],
      variations: [{ name: '1-100 NN (tens and ones format)', pdfUrl: '#' }],
      addOns: [
        { name: '101-200', pdfUrl: '#' },
        { name: '101-500', pdfUrl: '#' }
      ],
    },
    {
      name: 'Math work book',
      core: [{ name: '1-100 and 1-100 number names', pdfUrl: '#' }],
      variations: [{ name: '1-100 NN (tens and ones format)', pdfUrl: '#' }],
      addOns: [],
    },
    {
      name: 'EVS',
      core: [{ name: 'default', pdfUrl: '#' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Assessment',
      core: [{ name: 'annual', pdfUrl: '#' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Rhymes & stories',
      core: [{ name: 'Customisable but default version is there', pdfUrl: '#' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Art & craft',
      core: [{ name: 'default', pdfUrl: '#' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Kannada',
      core: [{ name: 'Swara & vyanjana V1', pdfUrl: '#' }],
      variations: [{ name: 'Swara & vyanjana V2', pdfUrl: '#' }],
      addOns: [],
    },
    {
      name: 'Hindi',
      core: [{ name: 'Swara & vyanjana V1', pdfUrl: '#' }],
      variations: [{ name: 'Swara & vyanjana V2', pdfUrl: '#' }],
      addOns: [],
    },
    {
      name: 'Tamil',
      core: [{ name: 'Swara & vyanjana V1', pdfUrl: '#' }],
      variations: [{ name: 'Swara & vyanjana V2', pdfUrl: '#' }],
      addOns: [],
    },
    {
      name: 'Telugu',
      core: [{ name: 'Swara & vyanjana V1', pdfUrl: '#' }],
      variations: [{ name: 'Swara & vyanjana V2', pdfUrl: '#' }],
      addOns: [],
    },
  ],
};

export const PRE_WRITTEN_DATA: PreWrittenClass[] = [
    {
        className: 'Nursery',
        subjects: [
            { subjectName: 'English', books: [{ name: 'English Pre-Written Book', pdfUrl: '#' }] },
            { subjectName: 'Maths', books: [{ name: 'Maths Pre-Written Book', pdfUrl: '#' }] },
        ],
    },
    {
        className: 'LKG',
        subjects: [
            { subjectName: 'English', books: [{ name: 'English Pre-Written Book', pdfUrl: '#' }] },
            { subjectName: 'Maths', books: [{ name: 'Maths Pre-Written Book', pdfUrl: '#' }] },
        ],
    },
    {
        className: 'UKG',
        subjects: [
            { subjectName: 'English', books: [{ name: 'English Pre-Written Book', pdfUrl: '#' }] },
            { subjectName: 'Maths', books: [{ name: 'Maths Pre-Written Book', pdfUrl: '#' }] },
            { subjectName: 'EVS', books: [{ name: 'EVS Pre-Written Book', pdfUrl: '#' }] },
        ],
    },
];