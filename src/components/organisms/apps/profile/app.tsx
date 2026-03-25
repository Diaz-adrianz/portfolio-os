import { IconContacts } from '@/assets/images';
import type { App, Launcher } from '../../types';

const profileApp: App = {
  id: 'PROFILE',
  title: { en: 'Profile', id: 'Profil' },
  launcherId: 'launch-profile',
  windowConfig: {
    maxWidth: 800,
    minWidth: 650,
    minHeight: 350,
  },
};

const profileLauncher: Launcher = {
  id: profileApp.launcherId,
  appId: profileApp.id,
  title: profileApp.title,
  image: IconContacts,
  pinned: true,
};

export { profileApp, profileLauncher };
