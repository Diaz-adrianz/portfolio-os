import {
  PageRouterProvider,
  PageRouterView,
} from '@/components/molecules/page-router';
import { AnimatePresence } from 'motion/react';
import { useWindow } from '@/components/molecules/window';
import GalleryRoutes from './routes';
import WindowDefaultLayout from '@/components/molecules/layouts/window-default.layout';

const View = () => {
  return (
    <WindowDefaultLayout>
      <AnimatePresence mode="wait">
        {PageRouterView({ routes: GalleryRoutes })}
      </AnimatePresence>
    </WindowDefaultLayout>
  );
};

const GalleryView = () => {
  const { initialRoute } = useWindow();

  return (
    <PageRouterProvider initialRoute={initialRoute}>
      <View />
    </PageRouterProvider>
  );
};

export default GalleryView;
