import MediaData from '@/data/media.data';
import type { Locale } from '@/data/options/locale.option';
import type { Theme } from '@/data/options/theme.option';

export interface Config {
  DEFAULT_LOCALE: Locale;
  DEFAULT_THEME: Theme;
  DEFAULT_WALLPAPER: string;
  DEFAULT_LOCKSCREEN: boolean;
  DEFAULT_SHUTDOWN: boolean;
}

const Config: Config = {
  DEFAULT_LOCALE: 'en',
  DEFAULT_THEME: 'dark',
  DEFAULT_WALLPAPER: MediaData[24].src,
  DEFAULT_LOCKSCREEN: true,
  DEFAULT_SHUTDOWN: true,
};

export default Config;
