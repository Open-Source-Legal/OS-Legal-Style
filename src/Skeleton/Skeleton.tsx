import React, { forwardRef, HTMLAttributes } from 'react';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: number | string;
  height?: number | string;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      animation = 'pulse',
      width,
      height,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-skeleton',
      `oc-skeleton--${variant}`,
      animation !== 'none' && `oc-skeleton--${animation}`,
      className,
    ].filter(Boolean).join(' ');

    const computedStyle: React.CSSProperties = {
      width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
      height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      ...style,
    };

    return <div ref={ref} className={classes} style={computedStyle} {...props} />;
  }
);

Skeleton.displayName = 'Skeleton';

// Pre-built skeleton components for common patterns
export interface SkeletonTextProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number;
  lastLineWidth?: string;
}

export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, lastLineWidth = '80%', className = '', ...props }, ref) => {
    const classes = ['oc-skeleton-text', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            variant="text"
            width={i === lines - 1 ? lastLineWidth : '100%'}
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = 'SkeletonText';

export const SkeletonAvatar = forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  ({ width = 40, height = 40, ...props }, ref) => {
    return <Skeleton ref={ref} variant="circular" width={width} height={height} {...props} />;
  }
);

SkeletonAvatar.displayName = 'SkeletonAvatar';

export const SkeletonButton = forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  ({ width = 100, height = 40, ...props }, ref) => {
    return <Skeleton ref={ref} variant="rounded" width={width} height={height} {...props} />;
  }
);

SkeletonButton.displayName = 'SkeletonButton';

// Card skeleton
export const DocumentCardSkeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => {
    const classes = ['oc-skeleton-document-card', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <Skeleton variant="rectangular" height={120} />
        <div className="oc-skeleton-document-card__content">
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="40%" height={12} />
        </div>
      </div>
    );
  }
);

DocumentCardSkeleton.displayName = 'DocumentCardSkeleton';

// Table row skeleton
export const TableRowSkeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { columns?: number }>(
  ({ columns = 4, className = '', ...props }, ref) => {
    const classes = ['oc-skeleton-table-row', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} variant="text" width={i === 0 ? '60%' : '80%'} />
        ))}
      </div>
    );
  }
);

TableRowSkeleton.displayName = 'TableRowSkeleton';

// Chat message skeleton
export const ChatMessageSkeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => {
    const classes = ['oc-skeleton-chat-message', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <SkeletonAvatar width={32} height={32} />
        <div className="oc-skeleton-chat-message__content">
          <Skeleton variant="text" width="30%" height={12} />
          <SkeletonText lines={2} lastLineWidth="60%" />
        </div>
      </div>
    );
  }
);

ChatMessageSkeleton.displayName = 'ChatMessageSkeleton';
