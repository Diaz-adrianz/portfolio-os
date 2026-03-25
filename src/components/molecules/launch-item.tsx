'use client';

import { cn } from '@/utils/misc';
import { Tooltip, TooltipContent, TooltipTrigger } from '../atoms/tooltip';
import Image, { ImageProps } from 'next/image';

const LaunchItem = ({
  dot,
  src,
  alt,
  className,
  ...props
}: { dot?: boolean } & ImageProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative size-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100%"
            className={cn('size-full object-cover', className)}
            {...props}
          />
          {dot && (
            <div className="bg-foreground absolute top-full left-1/2 size-1 -translate-x-1/2 rounded-full"></div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{alt}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default LaunchItem;
