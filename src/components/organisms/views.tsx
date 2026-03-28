import type { ReactNode } from 'react';
import type { App } from './types';
import { profileApp } from './apps/profile/app';
import ProfileView from './apps/profile/view';
import { notesApp } from './apps/notes/app';
import NotesView from './apps/notes/view';
import GalleryView from './apps/gallery/view';
import { galleryApp } from './apps/gallery/app';
import { worksApp } from './apps/works/app';
import WorksView from './apps/works/view';
import { achievementsApp } from './apps/achievements/app';
import AchievementsView from './apps/achievements/view';
import { mailApp } from './apps/mail/app';
import MailView from './apps/mail/view';
import { appsApp } from './apps/apps/app';
import AppsView from './apps/apps/view';
import { ingfokanimeApp } from './apps/ingfokanime/app';
import IngfokanimeView from './apps/ingfokanime/view';
import { photoboohtApp } from './apps/photobooth/app';
import PhotoboothView from './apps/photobooth/view';
import { tontonanimeApp } from './apps/tontonanime/app';
import TontonanimeView from './apps/tontonanime/view';

const Views: Record<App['id'], ReactNode> = {
  [appsApp.id]: <AppsView />,
  [profileApp.id]: <ProfileView />,
  [notesApp.id]: <NotesView />,
  [galleryApp.id]: <GalleryView />,
  [worksApp.id]: <WorksView />,
  [achievementsApp.id]: <AchievementsView />,
  [mailApp.id]: <MailView />,
  [photoboohtApp.id]: <PhotoboothView />,
  [ingfokanimeApp.id]: <IngfokanimeView />,
  [tontonanimeApp.id]: <TontonanimeView />,
};

export default Views;
