import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/atoms/sidebar';
import { WindowBar } from '../window';
import type { ReactNode } from 'react';
import { cn } from '@/utils/misc';
import { usePageRouter } from '../page-router';
import { Button } from '@/components/atoms/button';
import useSettings from '@/hooks/use-settings';
import { ChevronLeftIcon } from 'lucide-react';

interface ViewProps {
  barSlot?: ReactNode;
  contentSlot?: ReactNode;
  children?: ReactNode;
}

const View = ({ barSlot, contentSlot, children }: ViewProps) => {
  const { dict } = useSettings();
  const { open } = useSidebar();
  const { canBack, back } = usePageRouter();

  return (
    <>
      <WindowBar className={cn(open ? '' : 'bg-background')}>
        <SidebarTrigger size={'icon'} />
        {canBack && (
          <Button variant={'link'} onClick={back}>
            <ChevronLeftIcon />
            {dict('back')}
          </Button>
        )}
        {barSlot}
      </WindowBar>
      <Sidebar>
        <div className="sticky top-0 h-10"></div>
        <SidebarContent className="p-2">{contentSlot}</SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div
          className={cn(
            'absolute top-0 z-10 h-10 shadow-sm',
            open && 'bg-background'
          )}
        ></div>
        <div className="h-full pt-10">{children}</div>
      </SidebarInset>
    </>
  );
};

const WindowSidebarLayout = (props: ViewProps) => {
  return (
    <SidebarProvider className="h-full min-h-0">
      <View {...props} />
    </SidebarProvider>
  );
};

export default WindowSidebarLayout;
