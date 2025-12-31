import React, { forwardRef, HTMLAttributes } from 'react';

export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressVariant = 'determinate' | 'indeterminate';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showLabel?: boolean;
  color?: 'accent' | 'success' | 'warning' | 'error';
}

export interface ProgressCircleProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  size?: ProgressSize | number;
  strokeWidth?: number;
  showLabel?: boolean;
  color?: 'accent' | 'success' | 'warning' | 'error';
}

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ProgressSize | number;
  color?: string;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      variant = 'determinate',
      size = 'md',
      showLabel = false,
      color = 'accent',
      className = '',
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const classes = [
      'oc-progress',
      `oc-progress--${size}`,
      `oc-progress--${color}`,
      variant === 'indeterminate' && 'oc-progress--indeterminate',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} {...props}>
        <div className="oc-progress__track">
          <div
            className="oc-progress__bar"
            style={variant === 'determinate' ? { width: `${percentage}%` } : undefined}
          />
        </div>
        {showLabel && variant === 'determinate' && (
          <span className="oc-progress__label">{Math.round(percentage)}%</span>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(
  (
    {
      value = 0,
      max = 100,
      size = 'md',
      strokeWidth = 4,
      showLabel = false,
      color = 'accent',
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeMap: Record<ProgressSize, number> = { sm: 32, md: 48, lg: 64 };
    const dimension = typeof size === 'number' ? size : sizeMap[size];
    const radius = (dimension - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const offset = circumference - (percentage / 100) * circumference;

    const classes = [
      'oc-progress-circle',
      `oc-progress-circle--${color}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        style={{ width: dimension, height: dimension }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        {...props}
      >
        <svg width={dimension} height={dimension}>
          <circle
            className="oc-progress-circle__track"
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            className="oc-progress-circle__bar"
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${dimension / 2} ${dimension / 2})`}
          />
        </svg>
        {showLabel && (
          <span className="oc-progress-circle__label">{Math.round(percentage)}%</span>
        )}
      </div>
    );
  }
);

ProgressCircle.displayName = 'ProgressCircle';

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', color, className = '', style, ...props }, ref) => {
    const sizeMap: Record<ProgressSize, number> = { sm: 16, md: 24, lg: 32 };
    const dimension = typeof size === 'number' ? size : sizeMap[size];

    const classes = ['oc-spinner', className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        style={{ width: dimension, height: dimension, color, ...style }}
        role="status"
        aria-label="Loading"
        {...props}
      >
        <svg viewBox="0 0 24 24" fill="none" width={dimension} height={dimension}>
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="31.416"
            strokeDashoffset="10"
            opacity="0.25"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="31.416"
            strokeDashoffset="25"
          />
        </svg>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
