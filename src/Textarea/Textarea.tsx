import React, { forwardRef, TextareaHTMLAttributes, useId, useRef, useEffect, useCallback } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string | boolean;
  autoResize?: boolean;
  maxRows?: number;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      autoResize = false,
      maxRows = 10,
      rows = 3,
      fullWidth = false,
      disabled,
      id,
      className = '',
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const hasError = Boolean(error);
    const errorMessage = typeof error === 'string' ? error : undefined;
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    const adjustHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea || !autoResize) return;

      textarea.style.height = 'auto';
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;
      const maxHeight = lineHeight * maxRows + 16; // 16px for padding
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
    }, [autoResize, maxRows, textareaRef]);

    useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
      adjustHeight();
    };

    const wrapperClasses = [
      'oc-textarea-wrapper',
      fullWidth && 'oc-textarea-wrapper--full-width',
      className,
    ].filter(Boolean).join(' ');

    const textareaClasses = [
      'oc-textarea',
      hasError && 'oc-textarea--error',
      disabled && 'oc-textarea--disabled',
      autoResize && 'oc-textarea--auto-resize',
    ].filter(Boolean).join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={textareaId} className="oc-textarea-label">
            {label}
          </label>
        )}
        <textarea
          ref={textareaRef}
          id={textareaId}
          className={textareaClasses}
          disabled={disabled}
          rows={rows}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={hasError}
          aria-describedby={errorMessage ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {errorMessage && (
          <p id={`${textareaId}-error`} className="oc-textarea-error">
            {errorMessage}
          </p>
        )}
        {helperText && !errorMessage && (
          <p id={`${textareaId}-helper`} className="oc-textarea-helper">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
