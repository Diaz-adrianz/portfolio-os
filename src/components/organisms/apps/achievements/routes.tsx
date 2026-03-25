import type { Routes } from '@/components/molecules/page-router';
import IndexPage from './pages/index.page';

const AchievementsRoutes: Routes = {
  index: () => <IndexPage />,
};

export default AchievementsRoutes;
