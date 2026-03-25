import type { Routes } from '@/components/molecules/page-router';
import IndexPage from './pages/index.page';
import TopPage from './pages/top.page';
import SchedulePage from './pages/schedule.page';

const IngfokanimeRoutes: Routes = {
  index: () => <IndexPage />,
  top: () => <TopPage />,
  schedule: () => <SchedulePage />,
};

export default IngfokanimeRoutes;
