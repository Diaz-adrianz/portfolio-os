import { IconText } from '@/assets/images';
import type { App, Launcher } from '../../types';

const notesApp: App = {
  id: 'NOTES',
  title: { en: 'Notes', id: 'Catatan' },
  launcherId: 'launch-notes',
  windowConfig: {
    minWidth: 650,
    minHeight: 350,
  },
};

const notesLauncher: Launcher = {
  id: notesApp.launcherId,
  appId: notesApp.id,
  title: notesApp.title,
  image: IconText,
};

export { notesApp, notesLauncher };
