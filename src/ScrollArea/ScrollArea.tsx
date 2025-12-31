import React, { forwardRef, ReactNode, HTMLAttributes } from 'react';

export type ScrollAreaType = 'auto' | 'always' | 'hover' | 'scroll';

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /** Scrollbar visibility behavior */
  type?: ScrollAreaType;
  /** Enable horizontal scrolling */
  horizontal?: boolean;
  /** Enable vertical scrolling (default) */
  vertical?: boolean;
  /** Custom scrollbar styling */
  styled?: boolean;
  children?: ReactNode;
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      type = 'auto',
      horizontal = false,
      vertical = true,
      styled = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-scroll-area',
      `oc-scroll-area--${type}`,
      horizontal && 'oc-scroll-area--horizontal',
      vertical && 'oc-scroll-area--vertical',
      styled && 'oc-scroll-area--styled',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';
