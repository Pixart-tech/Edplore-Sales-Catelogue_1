import type { Curriculum, PreWrittenClass } from './types';
import {
  PG_ART_AND_CRAFT_IMAGES,
  PG_ENGLISH_IMAGES,
  PG_EVS_IMAGES,
  PG_MATHS_IMAGES,
  PG_PATTERN_IMAGES,
  PG_RHYMES_AND_STORIES_IMAGES,
} from './assets';

export const CURRICULUM_DATA: Curriculum = {
  PG: [
    {
      name: 'English',
      books: [
        {
          name: 'Pre-writing Strokes',
          imageAssets: PG_ENGLISH_IMAGES,
        },
      ],
    },
    {
      name: 'Maths',
      books: [
        {
          name: 'Pre-math Concepts',
          imageAssets: PG_MATHS_IMAGES,
        },
      ],
    },
    {
      name: 'EVS',
      books: [
        {
          name: 'Myself & My Surroundings',
          imageAssets: PG_EVS_IMAGES,
        },
      ],
    },
    {
      name: 'Art & Craft',
      books: [
        {
          name: 'Colouring & Craft Activities',
          imageAssets: PG_ART_AND_CRAFT_IMAGES,
        },
      ],
    },
    {
      name: 'Pattern',
      books: [
        {
          name: 'Pattern Writing Book',
          imageAssets: PG_PATTERN_IMAGES,
        },
      ],
    },
    {
      name: 'Rhymes & Stories',
      books: [
        {
          name: 'Collection of Rhymes & Stories',
          imageAssets: PG_RHYMES_AND_STORIES_IMAGES,
        },
      ],
    },
  ],
  Nursery: [
    {
      name: 'Eng skill book',
      core: [{ name: 'ABCD caps' }],
      variations: [
        { name: 'ABCD caps & small' },
        { name: 'ABCD small' },
        { name: 'SATPIN small' },
        { name: 'LTI caps' },
        { name: 'Jolly phonics' },
      ],
      addOns: [],
    },
    {
      name: 'Eng work book',
      core: [{ name: 'ABCD caps' }],
      variations: [
        { name: 'ABCD caps & small' },
        { name: 'ABCD small' },
        { name: 'SATPIN small' },
        { name: 'LTI caps' },
      ],
      addOns: [],
    },
    {
      name: 'Math skill',
      core: [{ name: '1-20' }],
      variations: [],
      addOns: [{ name: '21-50' }],
    },
    {
      name: 'Math work book',
      core: [{ name: '1-20' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'EVS',
      core: [{ name: 'default' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Assessment',
      core: [{ name: 'annual' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Rhymes & stories',
      core: [{ name: 'Customisable but default version is there' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Art & craft',
      core: [{ name: 'default' }],
      variations: [],
      addOns: [],
    },
  ],
  LKG: [
    {
      name: 'Eng skill book',
      core: [{ name: 'small + vowels' }],
      variations: [{ name: 'caps + vowels' }],
      addOns: [],
    },
    {
      name: 'Eng work book',
      core: [{ name: 'small + vowels' }],
      variations: [{ name: 'caps + vowels' }],
      addOns: [],
    },
    {
      name: 'Math skill',
      core: [{ name: '1-50 and 1-10 NN' }],
      variations: [{ name: '1-50 & 1-10 NN (tens and ones format)' }],
      addOns: [{ name: '51-100' }],
    },
    {
      name: 'Math work book',
      core: [{ name: '1-50 and 1-10 NN' }],
      variations: [{ name: '1-50 & 1-10 NN (tens and ones format)' }],
      addOns: [],
    },
    {
      name: 'EVS',
      core: [{ name: 'default' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Assessment',
      core: [{ name: 'annual' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Rhymes & stories',
      core: [{ name: 'Customisable but default version is there' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Art & craft',
      core: [{ name: 'default' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Kannada',
      core: [{ name: 'Swara V1' }],
      variations: [{ name: 'Swara V2' }],
      addOns: [],
    },
    {
        name: 'Hindi',
        core: [{ name: 'Swara V1' }],
        variations: [{ name: 'Swara V2' }],
        addOns: [],
    },
    {
        name: 'Tamil',
        core: [{ name: 'Swara V1' }],
        variations: [{ name: 'Swara V2' }],
        addOns: [],
    },
  ],
  UKG: [
    {
      name: 'Eng skill book',
      core: [{ name: 'without cursive+ long vowels + blends + diagraphs + simple sentences' }],
      variations: [],
      addOns: [{ name: 'Cursive book' }],
    },
    {
      name: 'Eng work book',
      core: [{ name: 'without cursive+ long vowels + blends + diagraphs + simple sentences' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Math skill',
      core: [{ name: '1-100 and 1-100 number names' }],
      variations: [{ name: '1-100 NN (tens and ones format)' }],
      addOns: [
        { name: '101-200' },
        { name: '101-500' }
      ],
    },
    {
      name: 'Math work book',
      core: [{ name: '1-100 and 1-100 number names' }],
      variations: [{ name: '1-100 NN (tens and ones format)' }],
      addOns: [],
    },
    {
      name: 'EVS',
      core: [{ name: 'default' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Assessment',
      core: [{ name: 'annual' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Rhymes & stories',
      core: [{ name: 'Customisable but default version is there' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Art & craft',
      core: [{ name: 'default' }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Kannada',
      core: [{ name: 'Swara & vyanjana V1' }],
      variations: [{ name: 'Swara & vyanjana V2' }],
      addOns: [],
    },
    {
      name: 'Hindi',
      core: [{ name: 'Swara & vyanjana V1' }],
      variations: [{ name: 'Swara & vyanjana V2' }],
      addOns: [],
    },
    {
      name: 'Tamil',
      core: [{ name: 'Swara & vyanjana V1' }],
      variations: [{ name: 'Swara & vyanjana V2' }],
      addOns: [],
    },
    {
      name: 'Telugu',
      core: [{ name: 'Swara & vyanjana V1' }],
      variations: [{ name: 'Swara & vyanjana V2' }],
      addOns: [],
    },
  ],
};

export const PRE_WRITTEN_DATA: PreWrittenClass[] = [
    {
        className: 'Nursery',
        subjects: [
            { subjectName: 'English', books: [{ name: 'English Pre-Written Book' }] },
            { subjectName: 'Maths', books: [{ name: 'Maths Pre-Written Book' }] },
        ],
    },
    {
        className: 'LKG',
        subjects: [
            { subjectName: 'English', books: [{ name: 'English Pre-Written Book' }] },
            { subjectName: 'Maths', books: [{ name: 'Maths Pre-Written Book' }] },
        ],
    },
    {
        className: 'UKG',
        subjects: [
            { subjectName: 'English', books: [{ name: 'English Pre-Written Book' }] },
            { subjectName: 'Maths', books: [{ name: 'Maths Pre-Written Book' }] },
            { subjectName: 'EVS', books: [{ name: 'EVS Pre-Written Book' }] },
        ],
    },
];