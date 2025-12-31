import React, { forwardRef, HTMLAttributes, ReactNode, useId } from 'react';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  helperText?: string;
  error?: string | boolean;
  required?: boolean;
  optional?: boolean;
  children?: ReactNode;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      htmlFor,
      helperText,
      error,
      required = false,
      optional = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const fieldId = htmlFor || generatedId;
    const hasError = Boolean(error);
    const errorMessage = typeof error === 'string' ? error : undefined;

    const classes = [
      'oc-form-field',
      hasError && 'oc-form-field--error',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {label && (
          <label htmlFor={fieldId} className="oc-form-field__label">
            {label}
            {required && <span className="oc-form-field__required">*</span>}
            {optional && <span className="oc-form-field__optional">(optional)</span>}
          </label>
        )}
        <div className="oc-form-field__control">{children}</div>
        {errorMessage && (
          <p className="oc-form-field__error" role="alert">
            {errorMessage}
          </p>
        )}
        {helperText && !errorMessage && (
          <p className="oc-form-field__helper">{helperText}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
