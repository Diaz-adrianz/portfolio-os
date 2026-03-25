import { IconApss } from '@/assets/images';
import type { App, Launcher } from '../../types';

const appsApp: App = {
  id: 'apps',
  title: { en: 'Apps', id: 'Aplikasi' },
  launcherId: 'launch-apps',
  windowConfig: {
    minWidth: 300,
    minHeight: 300,
  },
};

const appsLauncher: Launcher = {
  id: appsApp.launcherId,
  appId: appsApp.id,
  title: appsApp.title,
  image: IconApss,
  pinned: true,
};

export { appsApp, appsLauncher };
