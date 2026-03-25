'use client';

import { formatTime, fromNow } from '@/utils/date';
import moment, { type Moment } from 'moment';
import { useEffect, useMemo, useState } from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '../atoms/menubar';
import { AppleIcon, Layers2Icon } from 'lucide-react';
import { Calendar } from '../atoms/calendar';
import useSettings from '@/hooks/use-settings';
import { Theme, Themes } from '@/data/options/theme.option';
import { Locale, Locales } from '@/data/options/locale.option';
import useWindows from '@/hooks/use-windows';
import Apps from '../organisms/apps';
import { cn } from '@/utils/misc';
import useNotification from '@/hooks/use-notiification';
import { Item, ItemContent, ItemDescription, ItemTitle } from '../atoms/item';

const ControlBar = () => {
  const notif = useNotification();
  const { open, topWindow, overview, setOverview, ...windows } = useWindows();
  const {
    fullscreen,
    setFullscreen,
    locale,
    setLocale,
    theme,
    setTheme,
    setShutdown,
    setLockscreen,
    dict,
    tr,
    ...settings
  } = useSettings();

  const [date, setDate] = useState<Moment>(moment());

  useEffect(() => {
    const dateInterval = setInterval(() => setDate(moment()), 60000);
    return () => {
      clearInterval(dateInterval);
    };
  }, []);

  const _app = useMemo(
    () => (topWindow ? Apps[topWindow.appId] : undefined),
    [topWindow]
  );

  const _hardReset = () => {
    notif.clear();
    windows.clear();
    settings.clear();
  };

  const _shutdown = () => {
    setShutdown(true);
  };

  return (
    <Menubar className="bg-background rounded-none">
      {/* app menu  */}
      <MenubarMenu>
        <MenubarTrigger>
          <AppleIcon className="fill-foreground" size={14} />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => open('MAIL', `detail/1`)}>
            {dict('about')}
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>{dict('theme')}</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarRadioGroup
                value={theme}
                onValueChange={(v) => setTheme(v as Theme)}
              >
                {Themes.map((item, i) => (
                  <MenubarRadioItem key={i} value={item.value}>
                    {tr(item.label)}
                  </MenubarRadioItem>
                ))}
              </MenubarRadioGroup>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>{dict('languange')}</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarRadioGroup
                value={locale}
                onValueChange={(v) => setLocale(v as Locale)}
              >
                {Locales.map((item, i) => (
                  <MenubarRadioItem key={i} value={item.value}>
                    {tr(item.label)}
                  </MenubarRadioItem>
                ))}
              </MenubarRadioGroup>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem onClick={() => setFullscreen(!fullscreen)}>
            {dict(fullscreen ? 'exitFullscreen' : 'fullscreen')}
          </MenubarItem>
          <MenubarItem onClick={() => setLockscreen(true)}>
            {dict('lockscreen')}
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => _hardReset()}>
            {dict('hardReset')}
          </MenubarItem>
          <MenubarItem onClick={() => _shutdown()}>
            {dict('shutdown')}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {_app && (
        <MenubarMenu>
          <MenubarTrigger>
            <b>{tr(_app.title)}</b>
          </MenubarTrigger>
        </MenubarMenu>
      )}

      <div className="grow"></div>

      {/* time  */}
      <MenubarMenu>
        <MenubarTrigger>
          <p className="typo-caption-1">
            {formatTime(date, 'ddd DD MMM HH:mm A')}
          </p>
        </MenubarTrigger>
        <MenubarContent className="max-h-[90vh] w-72 overflow-y-auto border-none bg-transparent shadow-none ring-0 backdrop-blur-none outline-none">
          {notif.notifications.length > 0 && (
            <div className="mb-4 flex flex-col gap-2">
              {notif.notifications.map((item, i) => (
                <Item
                  key={i}
                  variant={'glass'}
                  onClick={() => notif.remove(item.id)}
                >
                  <ItemContent>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemDescription>{item.message}</ItemDescription>
                  </ItemContent>
                  <ItemContent>
                    <ItemDescription>
                      <small className="typo-caption-2">
                        {fromNow(item.createdAt)}
                      </small>
                    </ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </div>
          )}

          <div className="style-glass overflow-hidden rounded-xl">
            <Calendar className="w-full bg-transparent" />
          </div>
        </MenubarContent>
      </MenubarMenu>

      {/* mission control  */}
      <MenubarMenu>
        <MenubarTrigger onClick={() => setOverview(!overview)}>
          <Layers2Icon
            className={cn(overview && 'fill-foreground')}
            size={14}
          />
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};

export default ControlBar;
