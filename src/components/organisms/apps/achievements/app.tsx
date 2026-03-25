import { IconDiamond } from '@/assets/images';
import type { App, Launcher } from '../../types';

const achievementsApp: App = {
  id: 'ACHIEVEMENTS',
  title: { en: 'Achivements', id: 'Pencapaian' },
  launcherId: 'launch-achievements',
  windowConfig: {
    maxWidth: 900,
    minWidth: 400,
    minHeight: 350,
  },
};

const achievementsLauncher: Launcher = {
  id: achievementsApp.launcherId,
  appId: achievementsApp.id,
  title: achievementsApp.title,
  image: IconDiamond,
  pinned: true,
};

export { achievementsApp, achievementsLauncher };
