import React, { forwardRef, InputHTMLAttributes, useId, ReactNode } from 'react';

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  description?: string;
  size?: ToggleSize;
  error?: boolean;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      description,
      size = 'md',
      error = false,
      disabled,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const toggleId = id || generatedId;

    const wrapperClasses = [
      'oc-toggle-wrapper',
      disabled && 'oc-toggle-wrapper--disabled',
      className,
    ].filter(Boolean).join(' ');

    const trackClasses = [
      'oc-toggle-track',
      `oc-toggle-track--${size}`,
      props.checked && 'oc-toggle-track--checked',
      error && 'oc-toggle-track--error',
    ].filter(Boolean).join(' ');

    return (
      <label className={wrapperClasses} htmlFor={toggleId}>
        <span className={trackClasses}>
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            id={toggleId}
            className="oc-toggle-input"
            disabled={disabled}
            {...props}
          />
          <span className="oc-toggle-thumb" />
        </span>
        {(label || description) && (
          <span className="oc-toggle-content">
            {label && <span className="oc-toggle-label">{label}</span>}
            {description && <span className="oc-toggle-description">{description}</span>}
          </span>
        )}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';

// Alias for semantic naming
export const Switch = Toggle;
Switch.displayName = 'Switch';
