import type { Routes } from '@/components/molecules/page-router';
import IndexPage from './pages/index.page';
import DetailPage from './pages/detail.page';

const NotesRoutes: Routes = {
  index: () => <IndexPage />,
  'detail/:id': ({ id }) => <DetailPage id={id} />,
};

export default NotesRoutes;
