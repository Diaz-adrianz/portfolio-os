import type { Option } from './option';

export type Theme = 'dark' | 'light';

export const Theme: Record<Theme, Option<Theme>> = {
  dark: { value: 'dark', label: { en: 'Dark mode', id: 'Mode gelap' } },
  light: { value: 'light', label: { en: 'Light mode', id: 'Mode terang' } },
};

export const Themes = Object.values(Theme);
