import Config from '@/constants/config';
import Storage from '@/constants/storage';
import type { Mail } from '@/data/mail.data';
import { Locale } from '@/data/options/locale.option';
import { Theme } from '@/data/options/theme.option';
import { create } from 'zustand';

interface Settings {
  hydrated: boolean;
  theme: Theme;
  locale: Locale;
  fullscreen: boolean;
  lockscreen: boolean;
  shutdown: boolean;
  wallpaper: string;
  sentMails: Mail[];
}

interface SettingsAction {
  hydrate: () => void;
  setTheme: (theme: Theme) => void;
  setLocale: (locale: Locale) => void;
  setFullscreen: (state: boolean) => void;
  setLockscreen: (state: boolean) => void;
  setShutdown: (state: boolean) => void;
  setWallpaper: (src: string) => void;
  setSentMails: (mails: Mail[]) => void;
  clear: () => void;
}

const settings: Settings = {
  hydrated: false,
  theme: Config.DEFAULT_THEME,
  locale: Config.DEFAULT_LOCALE,
  fullscreen: false,
  lockscreen: Config.DEFAULT_LOCKSCREEN,
  shutdown: Config.DEFAULT_SHUTDOWN,
  wallpaper: Config.DEFAULT_WALLPAPER,
  sentMails: [],
};

const isBrowser = typeof window !== 'undefined';

const settingsStore = create<Settings & SettingsAction>((set, get) => ({
  ...settings,

  hydrate: () => {
    if (!isBrowser) return;

    let sentMails: Mail[] = [];

    try {
      const mailsStr = localStorage.getItem(Storage.MAILS);
      if (mailsStr) sentMails = JSON.parse(mailsStr) as Mail[];
    } catch {
      sentMails = [];
    }

    set({
      theme:
        (localStorage.getItem(Storage.THEME) as Theme | null) ??
        Config.DEFAULT_THEME,
      locale:
        (localStorage.getItem(Storage.LOCALE) as Locale | null) ??
        Config.DEFAULT_LOCALE,
      lockscreen:
        (localStorage.getItem(Storage.LOCKSCREEN) ??
          Config.DEFAULT_LOCKSCREEN.toString()) === 'true',
      shutdown:
        (localStorage.getItem(Storage.SHUTDOWN) ??
          Config.DEFAULT_SHUTDOWN.toString()) === 'true',
      wallpaper:
        localStorage.getItem(Storage.WALLPAPER) ?? Config.DEFAULT_WALLPAPER,
      sentMails,
      hydrated: true,
    });
  },

  setTheme: (theme) => {
    localStorage.setItem(Storage.THEME, theme);
    set({ theme });
  },

  setLocale: (locale) => {
    localStorage.setItem(Storage.LOCALE, locale);
    set({ locale });
  },

  setFullscreen: (state) => {
    set({ fullscreen: state });
  },

  setLockscreen: (state) => {
    localStorage.setItem(Storage.LOCKSCREEN, state.toString());
    set({ lockscreen: state });
  },

  setShutdown: (state) => {
    localStorage.setItem(Storage.SHUTDOWN, state.toString());
    if (state) localStorage.setItem(Storage.LOCKSCREEN, state.toString());
    set({ shutdown: state, lockscreen: state ? state : get().lockscreen });
  },

  setWallpaper: (src) => {
    localStorage.setItem(Storage.WALLPAPER, src);
    set({ wallpaper: src });
  },

  setSentMails: (mails) => {
    localStorage.setItem(Storage.MAILS, JSON.stringify(mails));
    set({ sentMails: mails });
  },

  clear: () => {
    localStorage.removeItem(Storage.THEME);
    localStorage.removeItem(Storage.LOCALE);
    localStorage.removeItem(Storage.WALLPAPER);
    localStorage.removeItem(Storage.MAILS);

    set({
      theme: Config.DEFAULT_THEME,
      locale: Config.DEFAULT_LOCALE,
      wallpaper: Config.DEFAULT_WALLPAPER,
      sentMails: [],
    });
  },
}));

export default settingsStore;
