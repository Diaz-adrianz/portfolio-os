import { cn } from '@/utils/misc';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'bg-muted-foreground/20 animate-pulse rounded-md',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
