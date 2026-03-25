'use client';

import { type HTMLProps } from 'react';
import { formatTime } from '@/utils/date';
import useSettings from '@/hooks/use-settings';

type TimelineProps = HTMLProps<HTMLDivElement>;

export const Timeline = ({ className, children, ...props }: TimelineProps) => {
  return (
    <div
      className={
        '[&>*:first-child]:before:top-auto [&>*:first-child]:before:bottom-0 [&>*:first-child]:before:h-3/4 [&>*:last-child]:before:top-0 [&>*:last-child]:before:h-1/4 ' +
        className
      }
      {...props}
    >
      {children}
    </div>
  );
};

interface TimelineItemProps extends HTMLProps<HTMLDivElement> {
  range: { since: string; until?: string };
  title: string;
  subtitle: string;
  image?: string;
}

export const TimelineItem = ({
  className,
  children,
  range,
  title,
  subtitle,
  image,
  ...props
}: TimelineItemProps) => {
  const { dict } = useSettings();

  return (
    <div
      className={
        'before:bg-border after:border-border after:bg-primary relative px-4 ps-16 pb-12 before:absolute before:top-0 before:left-9 before:h-full before:w-1 after:absolute after:top-1/4 after:left-8 after:size-3 after:rounded-full after:border-2 ' +
        className
      }
      {...props}
    >
      <small className="text-muted-foreground typo-caption-1 uppercase">
        {formatTime(range.since, 'MMM YYYY')} -{' '}
        {range.until ? formatTime(range.until, 'MMM YYYY') : dict('now')}
      </small>

      {image && (
        <div className="mt-2 mb-4 w-20">
          <img src={image} alt="" className="size-full" />
        </div>
      )}
      <div className="mb-4">
        <h3 className="typo-callout mb-1">{title}</h3>
        <p className="typo-footnote text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};
