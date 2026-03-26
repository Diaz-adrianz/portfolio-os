import { cn } from '@/utils/misc';
import { LoaderIcon } from 'lucide-react';
import { type ComponentProps } from 'react';

type LoadingOverlayProps = ComponentProps<'div'> & {
  text?: string;
};

const LoadingOverlay = ({
  text = 'Loading...',
  className,
  ...props
}: LoadingOverlayProps) => {
  return (
    <div
      className={cn(
        'bg-background/60 absolute top-0 left-0 z-10 flex size-full p-4 backdrop-blur-md',
        className
      )}
      {...props}
    >
      <div className="m-auto">
        <div className="text-foreground flex items-center gap-2">
          <LoaderIcon className="animate-spin" />
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export { LoadingOverlay };
