import type { Routes } from '@/components/molecules/page-router';
import TopPage from './pages/top.page';
import SchedulePage from './pages/schedule.page';
import SearchPage from './pages/search.page';

const IngfokanimeRoutes: Routes = {
  index: () => <SchedulePage />,
  search: () => <SearchPage />,
  top: () => <TopPage />,
};

export default IngfokanimeRoutes;
