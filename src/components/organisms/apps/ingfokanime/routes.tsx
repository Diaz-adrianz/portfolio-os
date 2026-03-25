import type { Routes } from '@/components/molecules/page-router';
import IndexPage from './pages/index.page';
import TopPage from './pages/top.page';

const IngfokanimeRoutes: Routes = {
  index: () => <IndexPage />,
  top: () => <TopPage />,
};

export default IngfokanimeRoutes;
