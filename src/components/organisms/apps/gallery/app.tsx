import { IconGallery } from '@/assets/images';
import type { App, Launcher } from '../../types';

const galleryApp: App = {
  id: 'GALLERY',
  title: { en: 'Gallery', id: 'Galeri' },
  launcherId: 'launch-gallery',
  windowConfig: {
    minWidth: 300,
    minHeight: 350,
  },
};

const galleryLauncher: Launcher = {
  id: galleryApp.launcherId,
  appId: galleryApp.id,
  title: galleryApp.title,
  image: IconGallery,
};

export { galleryApp, galleryLauncher };
