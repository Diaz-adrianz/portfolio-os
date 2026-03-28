import type { Routes } from '@/components/molecules/page-router';
import SearchPage from './pages/search.page';

const TontonanimeRoutes: Routes = {
  index: () => <SearchPage />,
};

export default TontonanimeRoutes;
