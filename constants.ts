import type { Curriculum, PreWrittenClass, QuickAccessSection } from './types';
import {
  ADD_ONS_CERTIFICATE_PDF,
  ADD_ONS_ID_CARDS_PDF,
  ADD_ONS_LANYARDS_PDF,
  ADD_ONS_REPORT_CARDS_PDF,
  COVER_PAGES_PDF,
  LKG_ART_AND_CRAFT_PDF,
  LKG_ASSESSMENT_PDF,
  LKG_CAPS_VOWELS_PDF,
  LKG_CAPS_VOWELS_WORKBOOK_PDF,
  LKG_EVS_PDF,
  LKG_HINDI_PDF,
  LKG_KANNADA_PDF,
  LKG_MATHS_1_50_AND_1_10_NN_PDF,
  LKG_MATHS_51_100_PDF,
  LKG_MATHS_WORKBOOK_1_50_AND_1_10_NN_PDF,
  LKG_RHYMES_AND_STORIES_PDF,
  LKG_SMALL_VOWELS_PDF,
  LKG_SMALL_VOWELS_WORKBOOK_PDF,
  LKG_TAMIL_PDF,
  LKG_TELUGU_PDF,
  NUR_ABCD_CAPS_AND_SMALL_PDF,
  NUR_ABCD_CAPS_AND_SMALL_WORKBOOK_PDF,
  NUR_ABCD_CAPS_PDF,
  NUR_ABCD_CAPS_WORKBOOK_PDF,
  NUR_ABCD_SMALL_PDF,
  NUR_ABCD_SMALL_WORKBOOK_PDF,
  NUR_ART_AND_CRAFT_PDF,
  NUR_ASSESSMENT_PDF,
  NUR_ENGLISH_WORK_BOOK_PDF,
  NUR_EVS_PDF,
  NUR_LTI_CAPS_PDF,
  NUR_LTI_CAPS_WORKBOOK_PDF,
  NUR_MATHS_1_20_PDF,
  NUR_MATHS_21_50_PDF,
  NUR_MATHS_WORKBOOK_1_20_PDF,
  NUR_RHYMES_AND_STORIES_PDF,
  NUR_SATPIN_SMALL_PDF,
  NUR_SATPIN_SMALL_WORKBOOK_PDF,
  PG_ART_AND_CRAFT_PDF,
  PG_ENGLISH_PDF,
  PG_EVS_PDF,
  PG_MATHS_PDF,
  PG_PATTERN_PDF,
  PG_RHYMES_AND_STORIES_PDF,
  PRE_WRITTEN_LKG_ENGLISH_PDF,
  PRE_WRITTEN_LKG_MATHS_PDF,
  PRE_WRITTEN_NURSERY_ENGLISH_PDF,
  PRE_WRITTEN_NURSERY_MATHS_PDF,
  PRE_WRITTEN_UKG_ENGLISH_PDF,
  PRE_WRITTEN_UKG_EVS_PDF,
  PRE_WRITTEN_UKG_MATHS_PDF,
  STICKERS_LKG_PDF,
  STICKERS_NURSERY_PDF,
  UKG_101_200_PDF,
  UKG_101_500_PDF,
  UKG_1_100_AND_1_100_NUMBER_NAMES_PDF,
  UKG_1_100_AND_1_100_NUMBER_NAMES_WORKBOOK_PDF,
  UKG_ART_AND_CRAFT_PDF,
  UKG_ASSESSMENT_PDF,
  UKG_CURSIVE_PDF,
  UKG_ENGLISH_SKILL_PDF,
  UKG_ENGLISH_WORK_BOOK_PDF,
  UKG_ENGLISH_WORKBOOK_PDF,
  UKG_EVS_PDF,
  UKG_HINDI_PDF,
  UKG_KANNADA_PDF,
  UKG_RHYMES_AND_STORIES_PDF,
  UKG_TAMIL_PDF,
} from './assets';

export const CURRICULUM_DATA: Curriculum = {
  PG: [
    {
      name: 'English',
      books: [
        {
          name: 'Pre-writing Strokes',
          pdfAsset: PG_ENGLISH_PDF,
        },
      ],
    },
    {
      name: 'Maths',
      books: [
        {
          name: 'Pre-math Concepts',
          pdfAsset: PG_MATHS_PDF,
        },
      ],
    },
    {
      name: 'EVS',
      books: [
        {
          name: 'Myself & My Surroundings',
          pdfAsset: PG_EVS_PDF,
        },
      ],
    },
    {
      name: 'Art & Craft',
      books: [
        {
          name: 'Colouring & Craft Activities',
          pdfAsset: PG_ART_AND_CRAFT_PDF,
        },
      ],
    },
    {
      name: 'Pattern',
      books: [
        {
          name: 'Pattern Writing Book',
          pdfAsset: PG_PATTERN_PDF,
        },
      ],
    },
    {
      name: 'Rhymes & Stories',
      books: [
        {
          name: 'Collection of Rhymes & Stories',
          pdfAsset: PG_RHYMES_AND_STORIES_PDF,
        },
      ],
    },
  ],
  Nursery: [
    {
      name: 'Eng skill book',
      core: [{ name: 'ABCD caps', pdfAsset: NUR_ABCD_CAPS_PDF }],
      variations: [
        { name: 'ABCD caps & small', pdfAsset: NUR_ABCD_CAPS_AND_SMALL_PDF },
        { name: 'ABCD small', pdfAsset: NUR_ABCD_SMALL_PDF },
        { name: 'SATPIN small', pdfAsset: NUR_SATPIN_SMALL_PDF },
        { name: 'LTI caps', pdfAsset: NUR_LTI_CAPS_PDF },
        { name: 'Jolly phonics' },
      ],
      addOns: [],
    },
    {
      name: 'Eng work book',
      core: [{ name: 'ABCD caps', pdfAsset: NUR_ABCD_CAPS_WORKBOOK_PDF }],
      variations: [
        { name: 'ABCD caps & small', pdfAsset: NUR_ABCD_CAPS_AND_SMALL_WORKBOOK_PDF },
        { name: 'ABCD small', pdfAsset: NUR_ABCD_SMALL_WORKBOOK_PDF },
        { name: 'SATPIN small', pdfAsset: NUR_SATPIN_SMALL_WORKBOOK_PDF },
        { name: 'LTI caps', pdfAsset: NUR_LTI_CAPS_WORKBOOK_PDF },
      ],
      addOns: [],
    },
    {
      name: 'Math skill',
      core: [{ name: '1-20', pdfAsset: NUR_MATHS_1_20_PDF }],
      variations: [],
      addOns: [{ name: '21-50', pdfAsset: NUR_MATHS_21_50_PDF }],
    },
    {
      name: 'Math work book',
      core: [{ name: '1-20', pdfAsset: NUR_MATHS_WORKBOOK_1_20_PDF }],
      variations: [],
      addOns: [],
    },
    {
      name: 'EVS',
      core: [{ name: 'default', pdfAsset: NUR_EVS_PDF }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Assessment',
      core: [{ name: 'annual', pdfAsset: NUR_ASSESSMENT_PDF }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Rhymes & stories',
      core: [
        {
          name: 'Customisable but default version is there',
          pdfAsset: NUR_RHYMES_AND_STORIES_PDF,
        },
      ],
      variations: [],
      addOns: [],
    },
    {
      name: 'Art & craft',
      core: [{ name: 'default', pdfAsset: NUR_ART_AND_CRAFT_PDF }],
      variations: [],
      addOns: [],
    },
    {
      name: 'English Work book',
      core: [{ name: 'default', pdfAsset: NUR_ENGLISH_WORK_BOOK_PDF }],
      variations: [],
      addOns: [],
    },
  ],
  LKG: [
    {
      name: 'Eng skill book',
      core: [{ name: 'small + vowels', pdfAsset: LKG_SMALL_VOWELS_PDF }],
      variations: [{ name: 'caps + vowels', pdfAsset: LKG_CAPS_VOWELS_PDF }],
      addOns: [],
    },
    {
      name: 'Eng work book',
      core: [{ name: 'small + vowels', pdfAsset: LKG_SMALL_VOWELS_WORKBOOK_PDF }],
      variations: [{ name: 'caps + vowels', pdfAsset: LKG_CAPS_VOWELS_WORKBOOK_PDF }],
      addOns: [],
    },
    {
      name: 'Math skill',
      core: [{ name: '1-50 and 1-10 NN', pdfAsset: LKG_MATHS_1_50_AND_1_10_NN_PDF }],
      variations: [],
      addOns: [{ name: '51-100', pdfAsset: LKG_MATHS_51_100_PDF }],
    },
    {
      name: 'Math work book',
      core: [{ name: '1-50 and 1-10 NN', pdfAsset: LKG_MATHS_WORKBOOK_1_50_AND_1_10_NN_PDF }],
      variations: [],
      addOns: [],
    },
    {
      name: 'EVS',
      core: [{ name: 'default', pdfAsset: LKG_EVS_PDF }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Assessment',
      core: [{ name: 'annual', pdfAsset: LKG_ASSESSMENT_PDF }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Rhymes & stories',
      core: [
        {
          name: 'Customisable but default version is there',
          pdfAsset: LKG_RHYMES_AND_STORIES_PDF,
        },
      ],
      variations: [],
      addOns: [],
    },
    {
      name: 'Art & craft',
      core: [{ name: 'default', pdfAsset: LKG_ART_AND_CRAFT_PDF }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Kannada',
      core: [{ name: 'Swara', pdfAsset: LKG_KANNADA_PDF }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Hindi',
      core: [{ name: 'Swara', pdfAsset: LKG_HINDI_PDF }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Tamil',
      core: [{ name: 'Swara', pdfAsset: LKG_TAMIL_PDF }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Telugu',
      core: [{ name: 'Swara', pdfAsset: LKG_TELUGU_PDF }],
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
          pdfAsset: UKG_ENGLISH_SKILL_PDF,
        },
      ],
      variations: [],
      addOns: [{ name: 'Cursive book', pdfAsset: UKG_CURSIVE_PDF }],
    },
    {
      name: 'Eng work book',
      core: [
        {
          name: 'without cursive+ long vowels + blends + diagraphs + simple sentences',
          pdfAsset: UKG_ENGLISH_WORKBOOK_PDF,
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
          pdfAsset: UKG_1_100_AND_1_100_NUMBER_NAMES_PDF,
        },
      ],
      variations: [],
      addOns: [
        { name: '101-200', pdfAsset: UKG_101_200_PDF },
        { name: '101-500', pdfAsset: UKG_101_500_PDF },
      ],
    },
    {
      name: 'Math work book',
      core: [
        {
          name: '1-100 and 1-100 number names',
          pdfAsset: UKG_1_100_AND_1_100_NUMBER_NAMES_WORKBOOK_PDF,
        },
      ],
      variations: [],
      addOns: [],
    },
    {
      name: 'EVS',
      core: [{ name: 'default', pdfAsset: UKG_EVS_PDF }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Assessment',
      core: [{ name: 'annual', pdfAsset: UKG_ASSESSMENT_PDF }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Rhymes & stories',
      core: [
        {
          name: 'Customisable but default version is there',
          pdfAsset: UKG_RHYMES_AND_STORIES_PDF,
        },
      ],
      variations: [],
      addOns: [],
    },
    {
      name: 'Art & craft',
      core: [{ name: 'default', pdfAsset: UKG_ART_AND_CRAFT_PDF }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Kannada',
      core: [{ name: 'Swara & vyanjana', pdfAsset: UKG_KANNADA_PDF }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Hindi',
      core: [{ name: 'Swara & vyanjana', pdfAsset: UKG_HINDI_PDF }],
      variations: [],
      addOns: [],
    },
    {
      name: 'Tamil',
      core: [{ name: 'Swara & vyanjana', pdfAsset: UKG_TAMIL_PDF }],
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
            { subjectName: 'English', books: [{ name: 'English Pre-Written Book', pdfAsset: PRE_WRITTEN_NURSERY_ENGLISH_PDF }] },
            { subjectName: 'Maths', books: [{ name: 'Maths Pre-Written Book', pdfAsset: PRE_WRITTEN_NURSERY_MATHS_PDF }] },
        ],
    },
    {
        className: 'LKG',
        subjects: [
            { subjectName: 'English', books: [{ name: 'English Pre-Written Book', pdfAsset: PRE_WRITTEN_LKG_ENGLISH_PDF }] },
            { subjectName: 'Maths', books: [{ name: 'Maths Pre-Written Book', pdfAsset: PRE_WRITTEN_LKG_MATHS_PDF }] },
        ],
    },
    {
        className: 'UKG',
        subjects: [
            { subjectName: 'English', books: [{ name: 'English Pre-Written Book', pdfAsset: PRE_WRITTEN_UKG_ENGLISH_PDF }] },
            { subjectName: 'Maths', books: [{ name: 'Maths Pre-Written Book', pdfAsset: PRE_WRITTEN_UKG_MATHS_PDF }] },
            { subjectName: 'EVS', books: [{ name: 'EVS Pre-Written Book', pdfAsset: PRE_WRITTEN_UKG_EVS_PDF }] },
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
        pdfAsset: COVER_PAGES_PDF,
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
        pdfAsset: STICKERS_NURSERY_PDF,
      },
      {
        title: 'LKG',
        buttonLabel: 'View',
        previewTitle: 'Stickers - LKG',
        pdfAsset: STICKERS_LKG_PDF,
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
        pdfAsset: ADD_ONS_ID_CARDS_PDF,
      },
      {
        title: 'Report cards',
        buttonLabel: 'View',
        previewTitle: 'Add ons - Report cards',
        pdfAsset: ADD_ONS_REPORT_CARDS_PDF,
      },
      {
        title: 'Certificate',
        buttonLabel: 'View',
        previewTitle: 'Add ons - Certificate',
        pdfAsset: ADD_ONS_CERTIFICATE_PDF,
      },
      {
        title: 'Lanyards',
        buttonLabel: 'View',
        previewTitle: 'Add ons - Lanyards',
        pdfAsset: ADD_ONS_LANYARDS_PDF,
      },
    ],
  },
];
