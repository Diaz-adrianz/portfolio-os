import type { Routes } from '@/components/molecules/page-router';
import IndexPage from './pages/index.page';
import CustomPage from './pages/custom.page';

const PhotoboothRoutes: Routes = {
  index: () => <IndexPage />,
  custom: () => <CustomPage />,
};

export default PhotoboothRoutes;
