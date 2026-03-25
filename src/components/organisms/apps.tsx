import { profileApp } from './apps/profile/app';
import { achievementsApp } from './apps/achievements/app';
import { galleryApp } from './apps/gallery/app';
import { mailApp } from './apps/mail/app';
import { notesApp } from './apps/notes/app';
import { worksApp } from './apps/works/app';
import type { App } from './types';
import { appsApp } from './apps/apps/app';
import { ingfokanimeApp } from './apps/ingfokanime/app';

const Apps = [
  appsApp,
  profileApp,
  achievementsApp,
  galleryApp,
  mailApp,
  notesApp,
  worksApp,
  ingfokanimeApp,
].reduce<Record<App['id'], App>>((apps, app) => {
  apps[app.id] = app;
  return apps;
}, {});

export default Apps;
