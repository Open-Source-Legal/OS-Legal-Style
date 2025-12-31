import React, { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface StatBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** The main value to display */
  value: string | number;
  /** Primary label */
  label: string;
  /** Secondary description/sublabel */
  sublabel?: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant for the value */
  variant?: 'default' | 'accent' | 'muted';
  /** Text alignment */
  align?: 'left' | 'center';
  /** Additional class name */
  className?: string;
}

export interface StatGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  columns?: 2 | 3 | 4;
  /** Gap between items */
  gap?: 'sm' | 'md' | 'lg';
  /** Additional class name */
  className?: string;
  children: ReactNode;
}

export const StatBlock = forwardRef<HTMLDivElement, StatBlockProps>(
  (
    {
      value,
      label,
      sublabel,
      icon,
      size = 'md',
      variant = 'accent',
      align = 'left',
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-stat-block',
      `oc-stat-block--${size}`,
      `oc-stat-block--${variant}`,
      `oc-stat-block--${align}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {icon && <div className="oc-stat-block__icon">{icon}</div>}
        <div className="oc-stat-block__content">
          <div className="oc-stat-block__value">{value}</div>
          <div className="oc-stat-block__label">{label}</div>
          {sublabel && <div className="oc-stat-block__sublabel">{sublabel}</div>}
        </div>
      </div>
    );
  }
);

StatBlock.displayName = 'StatBlock';

export const StatGrid = forwardRef<HTMLDivElement, StatGridProps>(
  (
    {
      columns = 2,
      gap = 'md',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-stat-grid',
      `oc-stat-grid--cols-${columns}`,
      `oc-stat-grid--gap-${gap}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

StatGrid.displayName = 'StatGrid';
