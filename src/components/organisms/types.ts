import type { Translation } from '@/data/options/locale.option';
import { StaticImageData } from 'next/image';

export type App = {
  id: string;
  title: Translation;
  launcherId: string;
  windowConfig?: {
    maxWidth?: number;
    minWidth?: number;
    maxHeight?: number;
    minHeight?: number;
  };
};

export type Launcher = {
  id: string;
  appId: string;
  title: Translation;
  image: string | StaticImageData;
  pinned?: boolean;
};
