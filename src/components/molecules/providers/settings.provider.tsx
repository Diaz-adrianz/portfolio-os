'use client';

import useSettings from '@/hooks/use-settings';
import { useEffect } from 'react';

export default function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { hydrate } = useSettings();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <>{children}</>;
}
