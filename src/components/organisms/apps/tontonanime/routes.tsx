import type { Routes } from '@/components/molecules/page-router';
import SearchPage from './pages/search.page';
import StreamPage from './pages/stream.page';

const TontonanimeRoutes: Routes = {
  index: () => <SearchPage />,
  'stream/:id': ({ id }) => <StreamPage id={id} />,
};

export default TontonanimeRoutes;
