'use client';

import useNotification from '@/hooks/use-notiification';
import { AnimatedList } from '../atoms/animated-list';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '../atoms/item';
import { useEffect, type ComponentProps } from 'react';
import type { Notification } from '@/stores/notification.store';
import {
  AlertOctagonIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  InfoIcon,
  LoaderIcon,
} from 'lucide-react';
import { cn } from '@/utils/misc';

const NotificationsOverlay = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  const { notifications, hideOverlay } = useNotification();

  return (
    <div className={cn('fixed top-9 right-1', className)} {...props}>
      <AnimatedList delay={0} className="gap-2">
        {notifications
          .filter((item) => item.overlay)
          .map((item) => (
            <NotificationItem
              key={item.id}
              data={item}
              onTimeout={() =>
                item.type != 'loading' ? hideOverlay(item.id) : null
              }
            />
          ))}
      </AnimatedList>
    </div>
  );
};

const NotificationItem = ({
  data,
  onTimeout,
}: {
  data: Notification;
  onTimeout: () => void;
}) => {
  useEffect(() => {
    const out = setTimeout(onTimeout, 3000);

    return () => {
      clearTimeout(out);
    };
  }, []);

  return (
    <Item variant={'glass'} className="w-screen max-w-72 shadow-lg">
      <ItemMedia>
        {data.type == 'loading' && (
          <LoaderIcon className="text-primary animate-spin" />
        )}
        {data.type == 'success' && (
          <CheckCircle2Icon className="text-green-500" size={18} />
        )}
        {data.type == 'warning' && (
          <AlertTriangleIcon className="text-yellow-500" size={18} />
        )}
        {data.type == 'info' && <InfoIcon className="text-primary" size={18} />}
        {data.type == 'error' && (
          <AlertOctagonIcon className="text-destructive" size={18} />
        )}
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{data.title}</ItemTitle>
        <ItemDescription>{data.message}</ItemDescription>
      </ItemContent>
    </Item>
  );
};
export default NotificationsOverlay;
