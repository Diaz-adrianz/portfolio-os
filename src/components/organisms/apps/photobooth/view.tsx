import {
  PageRouterProvider,
  PageRouterView,
} from '@/components/molecules/page-router';
import { AnimatePresence } from 'motion/react';
import { useWindow } from '@/components/molecules/window';
import PhotoboothRoutes from './routes';
import WindowDefaultLayout from '@/components/molecules/layouts/window-default.layout';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

const PHOTOS_COUNT = 4;
const PHOTO_RATIO = 4 / 3;

type ContextState = {
  photos: string[];
  setPhotos: Dispatch<SetStateAction<string[]>>;
};

const Context = createContext<ContextState | null>(null);

const View = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  return (
    <Context.Provider value={{ photos, setPhotos }}>
      <WindowDefaultLayout>
        <AnimatePresence mode="wait">
          {PageRouterView({ routes: PhotoboothRoutes })}
        </AnimatePresence>
      </WindowDefaultLayout>
    </Context.Provider>
  );
};

const usePhotoboothContext = () => {
  const ctx = useContext(Context);
  if (!ctx)
    throw new Error(
      'usePhotoboothContext must be used within a PhotoboothView'
    );
  return ctx;
};

const PhotoboothView = () => {
  const { initialRoute } = useWindow();

  return (
    <PageRouterProvider initialRoute={initialRoute}>
      <View />
    </PageRouterProvider>
  );
};

export { PHOTOS_COUNT, PHOTO_RATIO, usePhotoboothContext };
export default PhotoboothView;
