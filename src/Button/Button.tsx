import React, { forwardRef, ReactNode, ButtonHTMLAttributes, ElementType } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  as?: ElementType;
  children?: ReactNode;
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  'aria-label': string;
  children: ReactNode;
}

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  attached?: boolean;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      as: Component = 'button',
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-button',
      `oc-button--${variant}`,
      `oc-button--${size}`,
      fullWidth && 'oc-button--full-width',
      loading && 'oc-button--loading',
      disabled && 'oc-button--disabled',
      className,
    ].filter(Boolean).join(' ');

    const isDisabled = disabled || loading;

    return (
      <Component
        ref={ref}
        className={classes}
        disabled={Component === 'button' ? isDisabled : undefined}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <span className="oc-button__spinner">
            <svg className="oc-button__spinner-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="10" />
            </svg>
          </span>
        )}
        {leftIcon && !loading && <span className="oc-button__icon oc-button__icon--left">{leftIcon}</span>}
        <span className="oc-button__label">{children}</span>
        {rightIcon && <span className="oc-button__icon oc-button__icon--right">{rightIcon}</span>}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'ghost',
      size = 'md',
      loading = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-icon-button',
      `oc-icon-button--${variant}`,
      `oc-icon-button--${size}`,
      loading && 'oc-icon-button--loading',
      disabled && 'oc-icon-button--disabled',
      className,
    ].filter(Boolean).join(' ');

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <svg className="oc-icon-button__spinner" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="10" />
          </svg>
        ) : (
          children
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ attached = false, className = '', children, ...props }, ref) => {
    const classes = [
      'oc-button-group',
      attached && 'oc-button-group--attached',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} role="group" {...props}>
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';
