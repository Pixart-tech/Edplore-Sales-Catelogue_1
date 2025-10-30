import type { Curriculum, PreWrittenClass, QuickAccessSection } from './types';
import {
  PG_ART_AND_CRAFT_IMAGES,
  PG_ART_AND_CRAFT_PDF,
  PG_ENGLISH_IMAGES,
  PG_ENGLISH_PDF,
  PG_EVS_IMAGES,
  PG_EVS_PDF,
  PG_MATHS_IMAGES,
  PG_MATHS_PDF,
  PG_PATTERN_IMAGES,
  PG_PATTERN_PDF,
  PG_RHYMES_AND_STORIES_IMAGES,
  PG_RHYMES_AND_STORIES_PDF,
  NUR_1_20,
  NUR_1_20_WORKBOOK,
  NUR_21_50,
  NUR_ABCD_CAPS,
  NUR_ABCD_CAPS_WORKBOOK,
  NUR_ABCD_SMALL,
  NUR_ABCD_SMAL_WORKBOOK,
  NUR_ART_AND_CRAFT,
  NUR_ASSESSMENT,
  NUR_EVS,
  NUR_LTI_CAPS,
  NUR_LTI_CAPS_WORKBOOK,
  NUR_RHYMES_AND_STORIES,
  NUR_SATPIN_SMALL,
  LKG_1_50_AND_1_10_NN,
  LKG_1_50_AND_1_10_NN_TENS_AND_ONES_FORMAT,
  LKG_1_50_AND_1_10_NN_TENS_AND_ONES_FORMAT_WORKBOOK,
  LKG_51_100,
  LKG_ART_AND_CRAFT,
  LKG_ASSESSMENT,
  LKG_CAPS_VOWELS,
  LKG_HINDI,
  LKG_HINDI_SWARA_V2,
  LKG_KANNADA,
  LKG_KANNADA_SWARA_V2,
  LKG_SMALL_VOWELS,
  LKG_SMALL_VOWELS_WORKBOOK,
  LKG_TAMIL,
  LKG_TAMIL_SWARA_V2,
  UKG_101_200,
  UKG_101_500,
  UKG_1_100_AND_1_100_NUMBER_NAMES,
  UKG_1_100_AND_1_100_NUMBER_NAMES_WORKBOOK,
  UKG_1_100_NN_TENS_AND_ONES_FORMAT,
  UKG_1_100_NN_TENS_AND_ONES_FORMAT_WORKBOOK,
  UKG_ART_AND_CRAFT,
  UKG_ASSESSMENT,
  UKG_EVS,
  UKG_HINDI_SWARA_AND_VYANJANA_V1,
  UKG_HINDI_SWARA_AND_VYANJANA_V2,
  UKG_KANNADA_SWARA_AND_VYANJANA_V1,
  UKG_KANNADA_SWARA_AND_VYANJANA_V2,
  UKG_RHYMES_AND_STORIES,
  UKG_TAMIL_SWARA_AND_VYANJANA_V1,
  UKG_TAMIL_SWARA_AND_VYANJANA_V2,
  UKG_WITHOUT_CURSIVE_LONG_VOWELS_BLENDS_DIAPHRAMS_SIMPLE_SENTENCES,
  UKG_WITHOUT_CURSIVE_LONG_VOWELS_BLENDS_DIAPHRAMS_SIMPLE_SENTENCES_WORKBOOK,
} from './assets';

export const CURRICULUM_DATA: Curriculum = {
  PG: [
    {
      name: 'English',
      books: [
        {
          name: 'Pre-writing Strokes',
          imageAssets: PG_ENGLISH_IMAGES,
          pdfAsset: PG_ENGLISH_PDF,
        },
      ],
    },
    {
      name: 'Maths',
      books: [
        {
          name: 'Pre-math Concepts',
          imageAssets: PG_MATHS_IMAGES,
          pdfAsset: PG_MATHS_PDF,
        },
      ],
    },
    {
      name: 'EVS',
      books: [
        {
          name: 'Myself & My Surroundings',
          imageAssets: PG_EVS_IMAGES,
          pdfAsset: PG_EVS_PDF,
        },
      ],
    },
    {
      name: 'Art & Craft',
      books: [
        {
          name: 'Colouring & Craft Activities',
          imageAssets: PG_ART_AND_CRAFT_IMAGES,
          pdfAsset: PG_ART_AND_CRAFT_PDF,
        },
      ],
    },
    {
      name: 'Pattern',
      books: [
        {
          name: 'Pattern Writing Book',
          imageAssets: PG_PATTERN_IMAGES,
          pdfAsset: PG_PATTERN_PDF,
        },
      ],
    },
    {
      name: 'Rhymes & Stories',
      books: [
        {
          name: 'Collection of Rhymes & Stories',
          imageAssets: PG_RHYMES_AND_STORIES_IMAGES,
          pdfAsset: PG_RHYMES_AND_STORIES_PDF,
        },
      ],
    },
  ],
  Nursery: [
    {
      name: 'Eng skill book',
      core: [{ name: 'ABCD caps', imageAssets: NUR_ABCD_CAPS }],
      variations: [
        { name: 'ABCD caps & small', imageAssets: NUR_ABCD_CAPS },
        { name: 'ABCD small', imageAssets: NUR_ABCD_SMALL },
        { name: 'SATPIN small', imageAssets: NUR_SATPIN_SMALL },
        { name: 'LTI caps', imageAssets: NUR_LTI_CAPS },
        { name: 'Jolly phonics' },
      ],
      addOns: [],
    },
    {
      name: 'Eng work book',
      core: [{ name: 'ABCD caps', imageAssets: NUR_ABCD_CAPS_WORKBOOK }],
      variations: [
        { name: 'ABCD caps & small', imageAssets: NUR_ABCD_CAPS_WORKBOOK },
        { name: 'ABCD small', imageAssets: NUR_ABCD_SMAL_WORKBOOK },
        { name: 'SATPIN small' },
        { name: 'LTI caps', imageAssets: NUR_LTI_CAPS_WORKBOOK },
      ],
      addOns: [],
    },
    {
      name: 'Math skill',
      core: [{ name: '1-20', imageAssets: NUR_1_20 }],
      variations: [],
      addOns: [{ name: '21-50', imageAssets: NUR_21_50 }],
    },
    {
      name: 'Math work book',
      core: [{ name: '1-20', imageAssets: NUR_1_20_WORKBOOK }],
      variations: [],
      addOns: [],
    },
    {
      name: 'EVS',
      core: [{ name: 'default', imageAssets: NUR_EVS }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Assessment',
      core: [{ name: 'annual', imageAssets: NUR_ASSESSMENT }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Rhymes & stories',
      core: [
        {
          name: 'Customisable but default version is there',
          imageAssets: NUR_RHYMES_AND_STORIES,
        },
      ],
      variations: [],
      addOns: [],
    },
    {
      name: 'Art & craft',
      core: [{ name: 'default', imageAssets: NUR_ART_AND_CRAFT }],
      variations: [],
      addOns: [],
    },
  ],
  LKG: [
    {
      name: 'Eng skill book',
      core: [{ name: 'small + vowels', imageAssets: LKG_SMALL_VOWELS }],
      variations: [{ name: 'caps + vowels', imageAssets: LKG_CAPS_VOWELS }],
      addOns: [],
    },
    {
      name: 'Eng work book',
      core: [{ name: 'small + vowels', imageAssets: LKG_SMALL_VOWELS_WORKBOOK }],
      variations: [{ name: 'caps + vowels', imageAssets: LKG_CAPS_VOWELS }],
      addOns: [],
    },
    {
      name: 'Math skill',
      core: [{ name: '1-50 and 1-10 NN', imageAssets: LKG_1_50_AND_1_10_NN }],
      variations: [
        {
          name: '1-50 & 1-10 NN (tens and ones format)',
          imageAssets: LKG_1_50_AND_1_10_NN_TENS_AND_ONES_FORMAT,
        },
      ],
      addOns: [{ name: '51-100', imageAssets: LKG_51_100 }],
    },
    {
      name: 'Math work book',
      core: [
        {
          name: '1-50 and 1-10 NN',
          imageAssets: LKG_1_50_AND_1_10_NN_TENS_AND_ONES_FORMAT_WORKBOOK,
        },
      ],
      variations: [
        {
          name: '1-50 & 1-10 NN (tens and ones format)',
          imageAssets: LKG_1_50_AND_1_10_NN_TENS_AND_ONES_FORMAT_WORKBOOK,
        },
      ],
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
      core: [{ name: 'annual', imageAssets: LKG_ASSESSMENT }],
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
      core: [{ name: 'default', imageAssets: LKG_ART_AND_CRAFT }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Kannada',
      core: [{ name: 'Swara', imageAssets: LKG_KANNADA }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Hindi',
      core: [{ name: 'Swara', imageAssets: LKG_HINDI }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Tamil',
      core: [{ name: 'Swara', imageAssets: LKG_TAMIL }],
      variations: [],
      addOns: [],
    },
  ],
  UKG: [
    {
      name: 'Eng skill book',
      core: [
        {
          name: 'without cursive+ long vowels + blends + diagraphs + simple sentences',
          imageAssets: UKG_WITHOUT_CURSIVE_LONG_VOWELS_BLENDS_DIAPHRAMS_SIMPLE_SENTENCES,
        },
      ],
      variations: [],
      addOns: [{ name: 'Cursive book' }],
    },
    {
      name: 'Eng work book',
      core: [
        {
          name: 'without cursive+ long vowels + blends + diagraphs + simple sentences',
          imageAssets: UKG_WITHOUT_CURSIVE_LONG_VOWELS_BLENDS_DIAPHRAMS_SIMPLE_SENTENCES_WORKBOOK,
        },
      ],
      variations: [],
      addOns: [],
    },
    {
      name: 'Math skill',
      core: [
        {
          name: '1-100 and 1-100 number names',
          imageAssets: UKG_1_100_AND_1_100_NUMBER_NAMES,
        },
      ],
      variations: [
        {
          name: '1-100 NN (tens and ones format)',
          imageAssets: UKG_1_100_NN_TENS_AND_ONES_FORMAT,
        },
      ],
      addOns: [
        { name: '101-200', imageAssets: UKG_101_200 },
        { name: '101-500', imageAssets: UKG_101_500 },
      ],
    },
    {
      name: 'Math work book',
      core: [
        {
          name: '1-100 and 1-100 number names',
          imageAssets: UKG_1_100_AND_1_100_NUMBER_NAMES_WORKBOOK,
        },
      ],
      variations: [
        {
          name: '1-100 NN (tens and ones format)',
          imageAssets: UKG_1_100_NN_TENS_AND_ONES_FORMAT_WORKBOOK,
        },
      ],
      addOns: [],
    },
    {
      name: 'EVS',
      core: [{ name: 'default', imageAssets: UKG_EVS }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Assessment',
      core: [{ name: 'annual', imageAssets: UKG_ASSESSMENT }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Rhymes & stories',
      core: [
        {
          name: 'Customisable but default version is there',
          imageAssets: UKG_RHYMES_AND_STORIES,
        },
      ],
      variations: [],
      addOns: [],
    },
    {
      name: 'Art & craft',
      core: [{ name: 'default', imageAssets: UKG_ART_AND_CRAFT }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Kannada',
      core: [
        { name: 'Swara & vyanjana', imageAssets: UKG_KANNADA_SWARA_AND_VYANJANA_V1 },
      ],
      variations: [],
      addOns: [],
    },
    {
      name: 'Hindi',
      core: [
        { name: 'Swara & vyanjana', imageAssets: UKG_HINDI_SWARA_AND_VYANJANA_V1 },
      ],
      variations: [],
      addOns: [],
    },
    {
      name: 'Tamil',
      core: [
        { name: 'Swara & vyanjana', imageAssets: UKG_TAMIL_SWARA_AND_VYANJANA_V1 },
      ],
      variations: [],
      addOns: [],
    },
    {
      name: 'Telugu',
      core: [{ name: 'Swara & vyanjana' }],
      variations: [],
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

export const QUICK_ACCESS_SECTIONS: QuickAccessSection[] = [
  {
    title: 'Cover pages',
    items: [
      {
        buttonLabel: 'View',
        previewTitle: 'Cover Pages',
      },
    ],
  },
  {
    title: 'Stickers',
    items: [
      {
        title: 'Nursery',
        buttonLabel: 'View',
        previewTitle: 'Stickers - Nursery',
      },
      {
        title: 'LKG',
        buttonLabel: 'View',
        previewTitle: 'Stickers - LKG',
      },
      {
        title: 'UKG',
        buttonLabel: 'View',
        previewTitle: 'Stickers - UKG',
      },
    ],
  },
  {
    title: 'Add ons',
    items: [
      {
        title: 'ID cards',
        buttonLabel: 'View',
        previewTitle: 'Add ons - ID cards',
      },
      {
        title: 'Report cards',
        buttonLabel: 'View',
        previewTitle: 'Add ons - Report cards',
      },
      {
        title: 'Certificate',
        buttonLabel: 'View',
        previewTitle: 'Add ons - Certificate',
      },
      {
        title: 'Lanyards',
        buttonLabel: 'View',
        previewTitle: 'Add ons - Lanyards',
      },
    ],
  },
];
