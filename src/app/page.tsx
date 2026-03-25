'use client';

import Desktop from '@/components/molecules/desktop';
import Loadingscreen from '@/components/molecules/loadingscreen';
import Lockscreen from '@/components/molecules/lockscreen';
import Powerscreen from '@/components/molecules/powerscreen';
import useSettings from '@/hooks/use-settings';
import { AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const { hydrated, fullscreen, shutdown } = useSettings();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const exec = async () => {
      const elem = document.documentElement;

      try {
        const isInFullScreen =
          document.fullscreenElement && document.fullscreenElement !== null;

        if (fullscreen && !isInFullScreen) {
          if (elem.requestFullscreen) await elem.requestFullscreen();
        } else {
          if (document.exitFullscreen) await document.exitFullscreen();
        }
      } catch {
        //silent
      }
    };

    exec();
  }, [fullscreen]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!hydrated || loading ? (
        <Loadingscreen key={'loading'} />
      ) : shutdown ? (
        <Powerscreen key={'shutdown'} />
      ) : (
        <>
          <Lockscreen />
          <div className="fixed top-0 right-0 bottom-0 left-0 z-30 w-screen overflow-hidden">
            <Desktop />
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
