export type CheckoutMode = 'payment' | 'subscription';
export type CatalogCategory = 'membership' | 'studio' | 'beat' | 'design';

export type CatalogItem = {
  id: string;
  name: string;
  mode: CheckoutMode;
  category: CatalogCategory;
  submitType: 'pay' | 'book' | 'subscribe';
  priceEnv: string;
};

const fixedItems: CatalogItem[] = [
  ['plan_basic', 'Lukulu Academy - Basic membership', 'subscription', 'membership', 'subscribe', 'STRIPE_PRICE_PLAN_BASIC'],
  ['plan_pro', 'Lukulu Academy - Pro membership', 'subscription', 'membership', 'subscribe', 'STRIPE_PRICE_PLAN_PRO'],
  ['plan_vip', 'Lukulu Academy - VIP membership', 'subscription', 'membership', 'subscribe', 'STRIPE_PRICE_PLAN_VIP'],
  ['studio_recording', 'Vocal recording booking deposit', 'payment', 'studio', 'book', 'STRIPE_PRICE_STUDIO_RECORDING'],
  ['studio_mixing', 'Mixing service booking', 'payment', 'studio', 'book', 'STRIPE_PRICE_STUDIO_MIXING'],
  ['studio_mastering', 'Mastering service booking', 'payment', 'studio', 'book', 'STRIPE_PRICE_STUDIO_MASTERING'],
  ['studio_podcast', 'Podcast recording booking deposit', 'payment', 'studio', 'book', 'STRIPE_PRICE_STUDIO_PODCAST'],
  ['design_cover', 'Single cover design', 'payment', 'design', 'pay', 'STRIPE_PRICE_DESIGN_COVER'],
  ['design_poster', 'Promotional poster design', 'payment', 'design', 'pay', 'STRIPE_PRICE_DESIGN_POSTER'],
  ['design_video', 'Video editing', 'payment', 'design', 'pay', 'STRIPE_PRICE_DESIGN_VIDEO'],
  ['design_album', 'Album artwork design', 'payment', 'design', 'pay', 'STRIPE_PRICE_DESIGN_ALBUM'],
  ['design_social', 'Social media design pack', 'payment', 'design', 'pay', 'STRIPE_PRICE_DESIGN_SOCIAL'],
].map(([id, name, mode, category, submitType, priceEnv]) => ({
  id,
  name,
  mode,
  category,
  submitType,
  priceEnv,
})) as CatalogItem[];

const beats = ['indlela', 'riot', 'melo', 'lukulu_tapes'] as const;
const licences = ['basic', 'premium'] as const;

const beatItems: CatalogItem[] = beats.flatMap((beat) =>
  licences.map((licence) => ({
    id: `beat_${beat}_${licence}`,
    name: `${beat.replaceAll('_', ' ')} - ${licence} licence`,
    mode: 'payment' as const,
    category: 'beat' as const,
    submitType: 'pay' as const,
    priceEnv: `STRIPE_PRICE_BEAT_${beat.toUpperCase()}_${licence.toUpperCase()}`,
  })),
);

export const catalog = new Map(
  [...fixedItems, ...beatItems].map((item) => [item.id, item]),
);

export function getCatalogItem(itemId: string) {
  return catalog.get(itemId);
}

export function getStripePriceId(item: CatalogItem) {
  const value = process.env[item.priceEnv]?.trim();
  return value && /^price_[A-Za-z0-9]+$/.test(value) ? value : null;
}

export function getCatalogSetup() {
  const missingPriceEnvs = [...catalog.values()]
    .filter((item) => !getStripePriceId(item))
    .map((item) => item.priceEnv);

  return {
    configuredPrices: catalog.size - missingPriceEnvs.length,
    totalPrices: catalog.size,
    pricesReady: missingPriceEnvs.length === 0,
  };
}
