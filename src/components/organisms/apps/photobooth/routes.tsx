import type { Routes } from '@/components/molecules/page-router';
import IndexPage from './pages/index.page';

const PhotoboothRoutes: Routes = {
  index: () => <IndexPage />,
};

export default PhotoboothRoutes;
