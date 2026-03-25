'use client';

import ControlBar from './control-bar';
import { type ComponentProps, useRef } from 'react';
import { cn } from '@/utils/misc';
import LaunchBar from './launch-bar';
import useWindows from '@/hooks/use-windows';
import Window from './window';
import { motion, AnimatePresence } from 'motion/react';
import useSettings from '@/hooks/use-settings';
import NotificationsOverlay from './notifications-overlay';

const Desktop = ({ className, ...props }: ComponentProps<'div'>) => {
  const layerRef = useRef<HTMLDivElement>(null);

  const { windows } = useWindows();
  const { wallpaper } = useSettings();

  return (
    <div
      className={cn(
        'relative flex size-full flex-col overflow-hidden pb-14',
        className
      )}
      {...props}
    >
      <img
        src={wallpaper}
        alt=""
        className="absolute top-0 left-0 -z-10 size-full object-cover"
      />
      <ControlBar />

      <NotificationsOverlay className="z-50" />

      <motion.div ref={layerRef} className="relative z-40 grow">
        <AnimatePresence>
          {windows.map((window) => (
            <Window key={window.id} state={window} constraint={layerRef} />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="absolute right-0 bottom-0 left-0 z-50">
        <LaunchBar className="p-1" />
      </div>
    </div>
  );
};

export default Desktop;
