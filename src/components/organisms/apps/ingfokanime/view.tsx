import {
  PageRouterProvider,
  PageRouterView,
  usePageRouter,
} from '@/components/molecules/page-router';
import { AnimatePresence } from 'motion/react';
import { useWindow } from '@/components/molecules/window';
import IngfokanimeRoutes from './routes';
import { CalendarIcon, LucideIcon, SearchIcon, TrophyIcon } from 'lucide-react';
import { Translation } from '@/data/options/locale.option';
import WindowSidebarLayout from '@/components/molecules/layouts/window-sidebar.layout';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/atoms/sidebar';
import useSettings from '@/hooks/use-settings';

const menu: { to: string; icon: LucideIcon; label: Translation }[] = [
  {
    to: 'index',
    icon: SearchIcon,
    label: { en: 'Search', id: 'Pencarian' },
  },
  {
    to: 'top',
    icon: TrophyIcon,
    label: { en: 'Top', id: 'Teratas' },
  },
  {
    to: 'schedule',
    icon: CalendarIcon,
    label: { en: 'Schedule', id: 'Jadwal' },
  },
];

const View = () => {
  const { route, replace } = usePageRouter();
  const { tr } = useSettings();

  return (
    <WindowSidebarLayout
      contentSlot={
        <SidebarMenu>
          {menu.map((item, i) => (
            <SidebarMenuItem key={i}>
              <SidebarMenuButton
                onClick={() => replace(item.to)}
                isActive={route == item.to}
              >
                <item.icon className="text-muted-foreground" /> {tr(item.label)}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      }
    >
      <AnimatePresence mode="wait">
        {PageRouterView({ routes: IngfokanimeRoutes })}
      </AnimatePresence>
    </WindowSidebarLayout>
  );
};

const IngfokanimeView = () => {
  const { initialRoute } = useWindow();

  return (
    <PageRouterProvider initialRoute={initialRoute}>
      <View />
    </PageRouterProvider>
  );
};

export default IngfokanimeView;
