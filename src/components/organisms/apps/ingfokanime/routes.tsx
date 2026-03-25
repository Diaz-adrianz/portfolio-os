import type { Routes } from '@/components/molecules/page-router';
import TopPage from './pages/top.page';
import SchedulePage from './pages/schedule.page';
import SearchPage from './pages/search.page';
import DetailPage from './pages/detail.page';

const IngfokanimeRoutes: Routes = {
  index: () => <SchedulePage />,
  search: () => <SearchPage />,
  top: () => <TopPage />,
  'detail/:id': ({ id }) => <DetailPage id={id} />,
};

export default IngfokanimeRoutes;
