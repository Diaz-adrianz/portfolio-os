import type { Routes } from '@/components/molecules/page-router';
import IndexPage from './pages/index.page';
import DetailPage from './pages/detail.page';

const MailRoutes: Routes = {
  index: () => <IndexPage />,
  'detail/:id': ({ id }) => <DetailPage id={id} />,
};

export default MailRoutes;
