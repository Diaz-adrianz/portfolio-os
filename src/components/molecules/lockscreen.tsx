'use client';

import useSettings from '@/hooks/use-settings';
import type { Moment } from 'moment';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { formatTime } from '@/utils/date';
import { Avatar, AvatarFallback, AvatarImage } from '../atoms/avatar';
import { getInitials } from '@/utils/string';
import Biodata from '@/data/biodata';
import { Button } from '../atoms/button';
import { LockOpenIcon } from 'lucide-react';
import { motion, useAnimation } from 'motion/react';

const Lockscreen = () => {
  const { locale, dict, lockscreen, setLockscreen } = useSettings();

  const [date, setDate] = useState<Moment>(moment());

  const controls = useAnimation();

  useEffect(() => {
    const dateInterval = setInterval(() => setDate(moment()), 1000);
    return () => {
      clearInterval(dateInterval);
    };
  }, []);

  useEffect(() => {
    controls.set({ y: lockscreen ? 0 : '-100%' });
  }, []);

  useEffect(() => {
    if (lockscreen)
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: 'easeOut' },
      });
  }, [lockscreen]);

  const handleUnlock = () => {
    controls
      .start({
        y: '-100%',
        transition: { duration: 0.4, ease: 'easeInOut' },
      })
      .then(() => setLockscreen(false));
  };

  return (
    <motion.div
      key={'lockscreen'}
      drag="y"
      dragDirectionLock
      dragConstraints={{ top: -window.innerHeight, bottom: 0 }}
      dragElastic={0}
      onDragEnd={(_, info) => {
        const threshold = -300;
        const velocity = -500;

        if (info.offset.y < threshold || info.velocity.y < velocity) {
          handleUnlock();
        } else {
          controls.start({
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 30 },
          });
        }
      }}
      animate={controls}
      className="fixed top-0 right-0 bottom-0 left-0 z-40 w-screen"
    >
      <div className="flex size-full flex-col items-center px-8 pt-16">
        <div className="style-glass bg-popover/30 absolute top-0 left-0 -z-10 size-full" />

        <h6 className="typo-body">
          {formatTime(date, 'dddd, DD MMMM', { locale })}
        </h6>
        <h1 className="typo-display mb-auto text-7xl">
          {formatTime(date, 'HH:mm')}
        </h1>

        <div className="relative z-10 flex flex-col items-center pt-16 pb-4">
          <Avatar className="mb-4 size-16">
            <AvatarImage src={Biodata.avatar} alt="@shadcn" />
            <AvatarFallback>
              <h1>{getInitials(Biodata.firstname)}</h1>
            </AvatarFallback>
          </Avatar>
          <div className="mb-4 grid gap-px text-center">
            <h3 className="typo-body">
              {Biodata.firstname} {Biodata.lastname}
            </h3>
            <p className="typo-footnote">{Biodata.titles.join(' • ')}</p>
          </div>
          <Button onClick={handleUnlock} className="mb-8">
            <LockOpenIcon />
            {dict('unlock')}
          </Button>

          <small className="typo-footnote text-muted-foreground">
            {dict('or')}, {dict('swipeToUnlock')}
          </small>
        </div>
      </div>
    </motion.div>
  );
};

export default Lockscreen;
