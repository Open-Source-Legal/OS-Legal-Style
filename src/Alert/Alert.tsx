import React, { forwardRef, HTMLAttributes, ReactNode, useState } from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  icon?: ReactNode;
  action?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  children?: ReactNode;
}

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  icon?: ReactNode;
  action?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  children?: ReactNode;
}

const AlertIcon = ({ variant }: { variant: AlertVariant }) => {
  switch (variant) {
    case 'success':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'warning':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      );
    case 'error':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M15 9l-6 6M9 9l6 6" />
        </svg>
      );
    case 'info':
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      );
  }
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      icon,
      action,
      dismissible = false,
      onDismiss,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    const handleDismiss = () => {
      setDismissed(true);
      onDismiss?.();
    };

    const classes = [
      'oc-alert',
      `oc-alert--${variant}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} role="alert" {...props}>
        <div className="oc-alert__icon">
          {icon || <AlertIcon variant={variant} />}
        </div>
        <div className="oc-alert__content">
          {title && <div className="oc-alert__title">{title}</div>}
          {children && <div className="oc-alert__description">{children}</div>}
        </div>
        {action && <div className="oc-alert__action">{action}</div>}
        {dismissible && (
          <button className="oc-alert__dismiss" onClick={handleDismiss} aria-label="Dismiss">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      variant = 'info',
      icon,
      action,
      dismissible = false,
      onDismiss,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    const handleDismiss = () => {
      setDismissed(true);
      onDismiss?.();
    };

    const classes = [
      'oc-banner',
      `oc-banner--${variant}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} role="banner" {...props}>
        <div className="oc-banner__content">
          {icon && <span className="oc-banner__icon">{icon}</span>}
          <span className="oc-banner__text">{children}</span>
          {action && <span className="oc-banner__action">{action}</span>}
        </div>
        {dismissible && (
          <button className="oc-banner__dismiss" onClick={handleDismiss} aria-label="Dismiss">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Banner.displayName = 'Banner';
