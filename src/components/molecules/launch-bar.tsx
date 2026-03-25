'use client';

import { Dock, DockIcon } from '../atoms/dock';
import LaunchItem from './launch-item';
import { type ComponentProps, useMemo } from 'react';
import { cn } from '@/utils/misc';
import Launchers, { LauncherList } from '../organisms/launchers';
import useWindows from '@/hooks/use-windows';
import { motion } from 'motion/react';
import useSettings from '@/hooks/use-settings';
import Apps from '../organisms/apps';
import Image from 'next/image';

const LaunchBar = ({ className, ...props }: ComponentProps<'div'>) => {
  const { tr } = useSettings();
  const { open, focus, windows, minWindows } = useWindows();

  const appWindow = useMemo(() => {
    const map = new Map<string, Pick<(typeof windows)[number], 'id' | 'z'>>();

    for (const w of windows) {
      const current = map.get(w.appId);
      if (!current || w.z > current.z) map.set(w.appId, { id: w.id, z: w.z });
    }

    return map;
  }, [windows]);

  const items = useMemo(() => {
    return LauncherList.filter((l) => l.pinned || appWindow.has(l.appId));
  }, [appWindow]);

  return (
    <div className={cn('overflow-x-auto', className)} {...props}>
      <Dock iconMagnification={90} iconDistance={150} direction="bottom">
        {items.map((item) => {
          const window = appWindow.get(item.appId);

          return (
            <DockIcon
              key={item.id}
              id={item.id}
              className="relative"
              onClick={() => (window ? focus(window.id) : open(item.appId))}
            >
              <motion.div
                key={`${item.id}-${window?.id}`}
                initial={{ opacity: 0, y: 20, scale: 0.5 }}
                animate={{ opacity: 1, y: [0, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <LaunchItem
                  src={item.image}
                  alt={tr(item.title)}
                  dot={!!window}
                />
              </motion.div>
            </DockIcon>
          );
        })}
        {minWindows.map((item) => {
          const icon = Launchers[item.appId],
            app = Apps[item.appId];

          return (
            <DockIcon
              key={`launcher-win-${item.id}`}
              id={`launcher-win-${item.id}`}
              className="relative"
              onClick={() => focus(item.id)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.5 }}
                animate={{ opacity: 1, y: [0, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <LaunchItem
                  src={item.thumbnail ?? icon.image}
                  alt={`${tr(app.title)} - Window`}
                  className="object-contain"
                />
              </motion.div>
            </DockIcon>
          );
        })}
      </Dock>
    </div>
  );
};

export default LaunchBar;
