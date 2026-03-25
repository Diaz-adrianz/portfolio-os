'use client';

import useSettings from '@/hooks/use-settings';
import { motion } from 'motion/react';

const Loadingscreen = () => {
  const { dict } = useSettings();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ power: 0, duration: 0.3 }}
      className="bg-muted fixed top-0 right-0 bottom-0 left-0 z-50 flex w-screen"
    >
      <p className="typo-body m-auto animate-pulse">
        {dict('gettingThingsReadyForYou')}
      </p>
    </motion.div>
  );
};

export default Loadingscreen;
