import { IconTontonanime } from '@/assets/images';
import type { App, Launcher } from '../../types';

const tontonanimeApp: App = {
  id: 'TONTONANIME',
  title: { en: 'TontonAnime', id: 'TontonAnime' },
  launcherId: 'launch-tontonanime',
  windowConfig: {
    maxWidth: 900,
    minWidth: 400,
    minHeight: 350,
  },
};

const tontonanimeLauncher: Launcher = {
  id: tontonanimeApp.launcherId,
  appId: tontonanimeApp.id,
  title: tontonanimeApp.title,
  image: IconTontonanime,
};

export { tontonanimeApp, tontonanimeLauncher };
