import React, { forwardRef, ReactNode, HTMLAttributes } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback initials or icon */
  fallback?: ReactNode;
  /** Size variant */
  size?: AvatarSize;
  /** Online status indicator */
  status?: AvatarStatus;
  /** Use accent color background for AI/system avatars */
  accent?: boolean;
  /** Square shape instead of circle */
  square?: boolean;
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum avatars to show before +N */
  max?: number;
  /** Size of avatars */
  size?: AvatarSize;
  children: ReactNode;
}

const sizeMap: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      fallback,
      size = 'md',
      status,
      accent = false,
      square = false,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-avatar',
      `oc-avatar--${size}`,
      accent && 'oc-avatar--accent',
      square && 'oc-avatar--square',
      className,
    ].filter(Boolean).join(' ');

    const dimension = sizeMap[size];

    return (
      <div
        ref={ref}
        className={classes}
        style={{ width: dimension, height: dimension, ...style }}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt || ''} className="oc-avatar__image" />
        ) : (
          <span className="oc-avatar__fallback">{fallback}</span>
        )}
        {status && (
          <span className={`oc-avatar__status oc-avatar__status--${status}`} />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max = 4, size = 'md', className = '', children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleChildren = childArray.slice(0, max);
    const remainingCount = childArray.length - max;

    const classes = ['oc-avatar-group', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {visibleChildren.map((child, index) => (
          <div key={index} className="oc-avatar-group__item">
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
              : child}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="oc-avatar-group__item">
            <Avatar size={size} fallback={`+${remainingCount}`} />
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

/** AI Assistant avatar with animated gradient */
export const AIAvatar = forwardRef<HTMLDivElement, Omit<AvatarProps, 'fallback' | 'accent'>>(
  ({ size = 'md', className = '', ...props }, ref) => {
    const classes = ['oc-avatar--ai', className].filter(Boolean).join(' ');

    return (
      <Avatar
        ref={ref}
        size={size}
        accent
        className={classes}
        fallback={
          <svg viewBox="0 0 24 24" fill="currentColor" className="oc-avatar__ai-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        }
        {...props}
      />
    );
  }
);

AIAvatar.displayName = 'AIAvatar';
