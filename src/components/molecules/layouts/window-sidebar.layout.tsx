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

interface ViewProps {
  barSlot?: ReactNode;
  contentSlot?: ReactNode;
  children?: ReactNode;
}

const View = ({ barSlot, contentSlot, children }: ViewProps) => {
  const { open } = useSidebar();

  return (
    <>
      <WindowBar className={cn(open ? '' : 'bg-background')}>
        <SidebarTrigger size={'icon'} />
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
