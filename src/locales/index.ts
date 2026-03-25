import type { Locale, Translation } from '@/data/options/locale.option';
import en from './en.json';
import id from './id.json';
import Config from '@/constants/config';

const locales: any = { id, en };

const dictionary = (
  key: string,
  params: Record<string, any> = {},
  locale: Locale = Config.DEFAULT_LOCALE
) => {
  let translation = ((locales[locale] as any)?.[key] as string) || key;

  Object.keys(params).forEach((paramKey) => {
    const value = params[paramKey];
    const regex = new RegExp(`{{${paramKey}}}`, 'g');
    translation = translation.replace(regex, String(value));
  });

  return translation;
};

const translate = (
  translation?: Translation,
  locale: Locale = Config.DEFAULT_LOCALE
) => (translation ? (translation[locale] ?? '') : '');

export { dictionary, translate };
