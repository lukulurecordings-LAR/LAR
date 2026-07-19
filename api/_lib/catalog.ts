export type CheckoutMode = 'payment' | 'subscription';

export type CatalogItem = {
  id: string;
  name: string;
  description: string;
  unitAmount: number;
  mode: CheckoutMode;
  category: 'membership' | 'studio' | 'beat' | 'design';
  submitType: 'pay' | 'book' | 'subscribe';
};

const fixedItems: CatalogItem[] = [
  {
    id: 'plan_basic',
    name: 'Lukulu Academy — Basic membership',
    description: 'Monthly access to beginner music-production learning.',
    unitAmount: 14_900,
    mode: 'subscription',
    category: 'membership',
    submitType: 'subscribe',
  },
  {
    id: 'plan_pro',
    name: 'Lukulu Academy — Pro membership',
    description: 'Monthly access to the complete production curriculum.',
    unitAmount: 34_900,
    mode: 'subscription',
    category: 'membership',
    submitType: 'subscribe',
  },
  {
    id: 'plan_vip',
    name: 'Lukulu Academy — VIP membership',
    description: 'Monthly academy membership with priority support and feedback.',
    unitAmount: 99_900,
    mode: 'subscription',
    category: 'membership',
    submitType: 'subscribe',
  },
  {
    id: 'studio_recording',
    name: 'Vocal recording booking deposit',
    description: 'Reserves the first hour of a professional vocal recording session.',
    unitAmount: 30_000,
    mode: 'payment',
    category: 'studio',
    submitType: 'book',
  },
  {
    id: 'studio_mixing',
    name: 'Mixing service booking',
    description: 'Starting payment for one professionally mixed track.',
    unitAmount: 50_000,
    mode: 'payment',
    category: 'studio',
    submitType: 'book',
  },
  {
    id: 'studio_mastering',
    name: 'Mastering service booking',
    description: 'Starting payment for one release-ready mastered song.',
    unitAmount: 10_000,
    mode: 'payment',
    category: 'studio',
    submitType: 'book',
  },
  {
    id: 'studio_podcast',
    name: 'Podcast recording booking deposit',
    description: 'Reserves the first hour of a professional podcast recording session.',
    unitAmount: 30_000,
    mode: 'payment',
    category: 'studio',
    submitType: 'book',
  },
  {
    id: 'design_cover',
    name: 'Single cover design',
    description: 'Artwork design for one music single.',
    unitAmount: 25_000,
    mode: 'payment',
    category: 'design',
    submitType: 'pay',
  },
  {
    id: 'design_poster',
    name: 'Promotional poster design',
    description: 'One promotional poster for a release, show, or campaign.',
    unitAmount: 20_000,
    mode: 'payment',
    category: 'design',
    submitType: 'pay',
  },
  {
    id: 'design_video',
    name: 'Video editing',
    description: 'One music-video, lyric-video, or release visual edit.',
    unitAmount: 80_000,
    mode: 'payment',
    category: 'design',
    submitType: 'pay',
  },
  {
    id: 'design_album',
    name: 'Album artwork design',
    description: 'Artwork design for one album or EP campaign.',
    unitAmount: 50_000,
    mode: 'payment',
    category: 'design',
    submitType: 'pay',
  },
  {
    id: 'design_social',
    name: 'Social media design pack',
    description: 'A coordinated set of release-ready social media graphics.',
    unitAmount: 35_000,
    mode: 'payment',
    category: 'design',
    submitType: 'pay',
  },
];

const beats = [
  ['indlela', 'Indlela'],
  ['riot', 'Riot'],
  ['melo', 'Melo'],
  ['lukulu_tapes', 'Lukulu Tapes'],
] as const;

const licences = [
  {
    id: 'basic',
    label: 'Basic licence',
    description: 'MP3 beat licence for an independent release.',
    unitAmount: 30_000,
  },
  {
    id: 'premium',
    label: 'Premium licence',
    description: 'WAV beat licence with expanded commercial usage.',
    unitAmount: 80_000,
  },
] as const;

const beatItems: CatalogItem[] = beats.flatMap(([beatId, beatName]) =>
  licences.map((licence) => ({
    id: `beat_${beatId}_${licence.id}`,
    name: `${beatName} — ${licence.label}`,
    description: licence.description,
    unitAmount: licence.unitAmount,
    mode: 'payment' as const,
    category: 'beat' as const,
    submitType: 'pay' as const,
  })),
);

export const catalog = new Map(
  [...fixedItems, ...beatItems].map((item) => [item.id, item]),
);

export function getCatalogItem(itemId: string) {
  return catalog.get(itemId);
}
