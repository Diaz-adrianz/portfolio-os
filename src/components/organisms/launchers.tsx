import { profileApp, profileLauncher } from './apps/profile/app';
import { worksApp, worksLauncher } from './apps/works/app';
import { achievementsApp, achievementsLauncher } from './apps/achievements/app';
import { mailApp, mailLauncher } from './apps/mail/app';
import { notesApp, notesLauncher } from './apps/notes/app';
import { galleryApp, galleryLauncher } from './apps/gallery/app';
import type { App, Launcher } from './types';
import { appsApp, appsLauncher } from './apps/apps/app';
import { ingfokanimeApp, ingfokanimeLauncher } from './apps/ingfokanime/app';

const Launchers: Record<App['id'], Launcher> = {
  [appsApp.id]: appsLauncher,
  [profileApp.id]: profileLauncher,
  [worksApp.id]: worksLauncher,
  [achievementsApp.id]: achievementsLauncher,
  [mailApp.id]: mailLauncher,
  [notesApp.id]: notesLauncher,
  [galleryApp.id]: galleryLauncher,
  [ingfokanimeApp.id]: ingfokanimeLauncher,
};

const LauncherList: Launcher[] = Object.values(Launchers);

export { LauncherList };
export default Launchers;
