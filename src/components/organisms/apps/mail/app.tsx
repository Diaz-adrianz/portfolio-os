import { IconMail } from '@/assets/images';
import type { App, Launcher } from '../../types';

const mailApp: App = {
  id: 'MAIL',
  title: { en: 'Mail', id: 'Surat' },
  launcherId: 'launch-mail',
  windowConfig: {
    maxWidth: 900,
    minWidth: 650,
    minHeight: 350,
  },
};

const mailLauncher: Launcher = {
  id: mailApp.launcherId,
  appId: mailApp.id,
  title: mailApp.title,
  image: IconMail,
  pinned: true,
};

export { mailApp, mailLauncher };
