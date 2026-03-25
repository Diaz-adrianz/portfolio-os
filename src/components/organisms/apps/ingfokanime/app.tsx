import { IconIngfokanime } from '@/assets/images';
import type { App, Launcher } from '../../types';

const ingfokanimeApp: App = {
  id: 'INGFOKANIME',
  title: { en: 'IngfokAnime', id: 'IngfokAnime' },
  launcherId: 'launch-ingfokanime',
  windowConfig: {
    maxWidth: 900,
    minWidth: 400,
    minHeight: 350,
  },
};

const ingfokanimeLauncher: Launcher = {
  id: ingfokanimeApp.launcherId,
  appId: ingfokanimeApp.id,
  title: ingfokanimeApp.title,
  image: IconIngfokanime,
};

export { ingfokanimeApp, ingfokanimeLauncher };
