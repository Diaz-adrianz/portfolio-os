import type { Option } from './option';

export type Locale = 'en' | 'id';

export const Locale: Record<Locale, Option<Locale>> = {
  en: { value: 'en', label: { en: 'English', id: 'English' } },
  id: {
    value: 'id',
    label: { en: 'Bahasa Indonesia', id: 'Bahasa Indonesia' },
  },
};

export const Locales = Object.values(Locale);

export type Translation = Record<Locale, string>;
