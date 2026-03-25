import {
  PageRouterProvider,
  PageRouterView,
  usePageRouter,
} from '@/components/molecules/page-router';
import { AnimatePresence } from 'motion/react';
import { useWindow } from '@/components/molecules/window';
import WindowSidebarLayout from '@/components/molecules/layouts/window-sidebar.layout';
import NotesRoutes from './routes';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/atoms/sidebar';
import NotesData from '@/data/notes.data';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/atoms/item';
import { extractMarkdownText } from '@/utils/string';
import useSettings from '@/hooks/use-settings';
import { sortArray } from '@/utils/array';

const View = () => {
  const { tr } = useSettings();
  const { route, replace } = usePageRouter();

  const items = sortArray(NotesData, 'date', 'desc');

  return (
    <WindowSidebarLayout
      contentSlot={
        <SidebarMenu>
          {items.map((item, i) => (
            <SidebarMenuItem key={i}>
              <SidebarMenuButton
                className="h-auto"
                isActive={route == `detail/${item.id}`}
                asChild
              >
                <a href="#" onClick={() => replace(`detail/${item.id}`)}>
                  <Item className="p-0">
                    <ItemContent>
                      <ItemTitle>{item.title}</ItemTitle>
                      <ItemDescription>
                        {extractMarkdownText(tr(item.content))}
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      }
    >
      <AnimatePresence mode="wait">
        {PageRouterView({ routes: NotesRoutes })}
      </AnimatePresence>
    </WindowSidebarLayout>
  );
};

const NotesView = () => {
  const { initialRoute } = useWindow();

  return (
    <PageRouterProvider initialRoute={initialRoute}>
      <View />
    </PageRouterProvider>
  );
};

export default NotesView;
