import React, { forwardRef, ReactNode, InputHTMLAttributes, useId } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string | boolean;
  size?: InputSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      leftIcon,
      rightIcon,
      leftAddon,
      rightAddon,
      fullWidth = false,
      disabled,
      id,
      className = '',
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const hasError = Boolean(error);
    const errorMessage = typeof error === 'string' ? error : undefined;

    const wrapperClasses = [
      'oc-input-wrapper',
      fullWidth && 'oc-input-wrapper--full-width',
      className,
    ].filter(Boolean).join(' ');

    const containerClasses = [
      'oc-input-container',
      `oc-input-container--${size}`,
      hasError && 'oc-input-container--error',
      disabled && 'oc-input-container--disabled',
      leftAddon && 'oc-input-container--has-left-addon',
      rightAddon && 'oc-input-container--has-right-addon',
    ].filter(Boolean).join(' ');

    const inputClasses = [
      'oc-input',
      leftIcon && 'oc-input--has-left-icon',
      rightIcon && 'oc-input--has-right-icon',
    ].filter(Boolean).join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className="oc-input-label">
            {label}
          </label>
        )}
        <div className={containerClasses}>
          {leftAddon && <div className="oc-input-addon oc-input-addon--left">{leftAddon}</div>}
          <div className="oc-input-field">
            {leftIcon && <span className="oc-input-icon oc-input-icon--left">{leftIcon}</span>}
            <input
              ref={ref}
              id={inputId}
              className={inputClasses}
              disabled={disabled}
              aria-invalid={hasError}
              aria-describedby={errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
              {...props}
            />
            {rightIcon && <span className="oc-input-icon oc-input-icon--right">{rightIcon}</span>}
          </div>
          {rightAddon && <div className="oc-input-addon oc-input-addon--right">{rightAddon}</div>}
        </div>
        {errorMessage && (
          <p id={`${inputId}-error`} className="oc-input-error">
            {errorMessage}
          </p>
        )}
        {helperText && !errorMessage && (
          <p id={`${inputId}-helper`} className="oc-input-helper">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
