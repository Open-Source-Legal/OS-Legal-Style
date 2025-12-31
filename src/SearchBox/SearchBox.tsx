import React, { forwardRef, useState, useCallback } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

export interface SearchBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit' | 'size'> {
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Called when value changes */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Called when search is submitted */
  onSubmit?: (value: string) => void;
  /** Button text */
  buttonText?: string;
  /** Custom button content */
  buttonContent?: ReactNode;
  /** Show loading state */
  loading?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom search icon */
  icon?: ReactNode;
  /** Hide the search button */
  hideButton?: boolean;
  /** Additional class name */
  className?: string;
}

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="9" r="6" />
    <path d="M13.5 13.5L17 17" strokeLinecap="round" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="oc-search-box__spinner" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="8" cy="8" r="6" strokeOpacity="0.25" />
    <path d="M8 2a6 6 0 0 1 6 6" strokeLinecap="round" />
  </svg>
);

export const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(
  (
    {
      placeholder = 'Search...',
      value,
      onChange,
      onSubmit,
      buttonText = 'Search',
      buttonContent,
      loading = false,
      size = 'md',
      icon,
      hideButton = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState('');
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (value === undefined) {
          setInternalValue(e.target.value);
        }
        onChange?.(e);
      },
      [value, onChange]
    );

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(currentValue);
      },
      [currentValue, onSubmit]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          onSubmit?.(currentValue);
        }
      },
      [currentValue, onSubmit]
    );

    const classes = [
      'oc-search-box',
      `oc-search-box--${size}`,
      loading && 'oc-search-box--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <form className={classes} onSubmit={handleSubmit}>
        <span className="oc-search-box__icon">{icon || <SearchIcon />}</span>
        <input
          ref={ref}
          type="text"
          className="oc-search-box__input"
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={loading}
          {...props}
        />
        {!hideButton && (
          <button
            type="submit"
            className="oc-search-box__button"
            disabled={loading}
          >
            {loading ? <SpinnerIcon /> : buttonContent || buttonText}
          </button>
        )}
      </form>
    );
  }
);

SearchBox.displayName = 'SearchBox';
