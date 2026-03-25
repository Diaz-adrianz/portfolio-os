'use client';

import useSettings from '@/hooks/use-settings';
import { Button } from '../atoms/button';
import { PowerIcon } from 'lucide-react';
import Biodata from '@/data/biodata';
import { motion } from 'motion/react';

const Powerscreen = () => {
  const { dict, setShutdown } = useSettings();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ translateY: '-100%' }}
      transition={{ power: 0, ease: 'easeIn', duration: 0.5 }}
      className="fixed top-0 right-0 bottom-0 left-0 z-50 w-screen"
    >
      <div className="bg-muted flex size-full flex-col items-center justify-center gap-8">
        <Button
          onClick={() => setShutdown(false)}
          size={'icon'}
          className="size-32"
        >
          <PowerIcon className="size-18" />
        </Button>
        <small className="typo-footnote text-muted-foreground max-w-60 text-center">
          {dict('copyright', { name: Biodata.firstname })}
        </small>
        <small className="typo-caption-2 text-muted-foreground max-w-60 text-center">
          *{dict('desktopExperience')}
        </small>
      </div>
    </motion.div>
  );
};

export default Powerscreen;
