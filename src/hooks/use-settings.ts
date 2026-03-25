import { dictionary, translate } from '@/locales';
import settingsStore from '@/stores/settings.store';
import { useTheme } from 'next-themes';
import { useCallback, useEffect } from 'react';

const useSettings = () => {
  const { setTheme } = useTheme();
  const store = settingsStore();

  // themes
  useEffect(() => {
    if (store.theme && store.hydrated) setTheme(store.theme);
  }, [setTheme, store.theme, store.hydrated]);

  const dict = useCallback(
    (...params: Parameters<typeof dictionary>) => {
      return dictionary(params[0], params[1], store.locale);
    },
    [store.locale]
  );

  const tr = useCallback(
    (...params: Parameters<typeof translate>) => {
      return translate(params[0], store.locale);
    },
    [store.locale]
  );

  return { ...store, dict, tr };
};

export default useSettings;
