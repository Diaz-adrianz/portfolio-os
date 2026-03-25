import { WindowBar } from '../window';
import type { ReactNode } from 'react';
import { cn } from '@/utils/misc';
import { Button } from '@/components/atoms/button';
import { ChevronLeftIcon } from 'lucide-react';
import { usePageRouter } from '../page-router';
import useSettings from '@/hooks/use-settings';

interface ViewProps {
  barSlot?: ReactNode;
  children?: ReactNode;
}

const View = ({ barSlot, children }: ViewProps) => {
  const { dict } = useSettings();
  const { canBack, back } = usePageRouter();

  return (
    <>
      <WindowBar className={cn('bg-background shadow-sm')}>
        {canBack && (
          <Button variant={'link'} onClick={back}>
            <ChevronLeftIcon />
            {dict('back')}
          </Button>
        )}
        {barSlot}
      </WindowBar>
      <div className="h-full w-full pt-10">{children}</div>
    </>
  );
};

const WindowDefaultLayout = (props: ViewProps) => {
  return <View {...props} />;
};

export default WindowDefaultLayout;
