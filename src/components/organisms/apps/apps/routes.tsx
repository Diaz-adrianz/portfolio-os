import type { Routes } from '@/components/molecules/page-router';
import IndexPage from './pages/index.page';

const AppsRoutes: Routes = {
  index: () => <IndexPage />,
};

export default AppsRoutes;
