import React, { forwardRef, ReactNode, HTMLAttributes } from 'react';

export type CardVariant = 'elevated' | 'flat' | 'outlined';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
  children?: ReactNode;
}

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'elevated', padding = 'md', interactive = false, className = '', children, ...props }, ref) => {
    const classes = [
      'oc-card',
      `oc-card--${variant}`,
      `oc-card--padding-${padding}`,
      interactive && 'oc-card--interactive',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, className = '', children, ...props }, ref) => {
    const classes = ['oc-card-header', className].filter(Boolean).join(' ');

    if (children) {
      return (
        <div ref={ref} className={classes} {...props}>
          {children}
        </div>
      );
    }

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="oc-card-header__content">
          {title && <div className="oc-card-header__title">{title}</div>}
          {subtitle && <div className="oc-card-header__subtitle">{subtitle}</div>}
        </div>
        {action && <div className="oc-card-header__action">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-card-body', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-card-footer', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
