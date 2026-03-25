import { IconBooth } from '@/assets/images';
import type { App, Launcher } from '../../types';

const photoboohtApp: App = {
  id: 'PHOTOBOOTH',
  title: { en: 'Photo booth', id: 'Stan foto' },
  launcherId: 'launch-photobooht',
  windowConfig: {
    maxWidth: 900,
    minWidth: 400,
    minHeight: 350,
  },
};

const photoboohtLauncher: Launcher = {
  id: photoboohtApp.launcherId,
  appId: photoboohtApp.id,
  title: photoboohtApp.title,
  image: IconBooth,
};

export { photoboohtApp, photoboohtLauncher };
