import { IconTools } from '@/assets/images';
import type { App, Launcher } from '../../types';

const worksApp: App = {
  id: 'WORKS',
  title: { en: 'Works', id: 'Karya' },
  launcherId: 'launch-works',
  windowConfig: {
    maxWidth: 900,
    minWidth: 500,
    minHeight: 350,
  },
};

const worksLauncher: Launcher = {
  id: worksApp.launcherId,
  appId: worksApp.id,
  title: worksApp.title,
  image: IconTools,
  pinned: true,
};

export { worksApp, worksLauncher };
