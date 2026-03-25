import {
  PageRouterProvider,
  PageRouterView,
  usePageRouter,
} from '@/components/molecules/page-router';
import { AnimatePresence } from 'motion/react';
import { useWindow } from '@/components/molecules/window';
import WindowSidebarLayout from '@/components/molecules/layouts/window-sidebar.layout';
import MailRoutes from './routes';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/atoms/sidebar';
import MailData from '@/data/mail.data';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/atoms/item';
import { extractMarkdownText } from '@/utils/string';
import { fromNow } from '@/utils/date';
import { PencilLineIcon } from 'lucide-react';
import useSettings from '@/hooks/use-settings';

const View = () => {
  const { route, replace } = usePageRouter(),
    { sentMails, dict, tr } = useSettings();

  return (
    <WindowSidebarLayout
      contentSlot={
        <>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => replace('index')}
                    isActive={route == 'index'}
                  >
                    <PencilLineIcon className="text-muted-foreground" />{' '}
                    {dict('newMessage')}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {sentMails.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel>{dict('sent')}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sentMails.map((item, i) => (
                    <SidebarMenuItem key={i}>
                      <SidebarMenuButton
                        className="h-auto"
                        isActive={route == `detail/${item.id}`}
                        asChild
                      >
                        <a
                          href="#"
                          onClick={() => replace(`detail/${item.id}`)}
                        >
                          <Item className="p-0">
                            <ItemContent>
                              <ItemTitle>{item.to.name}</ItemTitle>
                              <ItemDescription>
                                <b>{tr(item.subject)}</b>
                                <br />
                                {extractMarkdownText(tr(item.content))}
                              </ItemDescription>
                            </ItemContent>
                            <ItemContent className="flex-none items-start text-center">
                              <ItemDescription>
                                <small className="typo-footnote">
                                  {fromNow(item.createdAt)}
                                </small>
                              </ItemDescription>
                            </ItemContent>
                          </Item>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
          <SidebarGroup>
            <SidebarGroupLabel>{dict('inbox')}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {MailData.map((item, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton
                      className="h-auto"
                      isActive={route == `detail/${item.id}`}
                      asChild
                    >
                      <a href="#" onClick={() => replace(`detail/${item.id}`)}>
                        <Item className="p-0">
                          <ItemContent>
                            <ItemTitle>{item.from.name}</ItemTitle>
                            <ItemDescription>
                              <b>{tr(item.subject)}</b>
                              <br />
                              {extractMarkdownText(tr(item.content))}
                            </ItemDescription>
                          </ItemContent>
                          <ItemContent className="flex-none items-start text-center">
                            <ItemDescription>
                              <small className="typo-footnote">
                                {fromNow(item.createdAt)}
                              </small>
                            </ItemDescription>
                          </ItemContent>
                        </Item>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </>
      }
    >
      <AnimatePresence mode="wait">
        {PageRouterView({ routes: MailRoutes })}
      </AnimatePresence>
    </WindowSidebarLayout>
  );
};

const MailView = () => {
  const { initialRoute } = useWindow();

  return (
    <PageRouterProvider initialRoute={initialRoute}>
      <View />
    </PageRouterProvider>
  );
};

export default MailView;
