import React, { forwardRef, useState, useRef, useEffect, useId, ReactNode, KeyboardEvent } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string | boolean;
  size?: SelectSize;
  options: (SelectOption | SelectOptionGroup)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  id?: string;
}

function isOptionGroup(item: SelectOption | SelectOptionGroup): item is SelectOptionGroup {
  return 'options' in item;
}

function flattenOptions(options: (SelectOption | SelectOptionGroup)[]): SelectOption[] {
  return options.flatMap(item => isOptionGroup(item) ? item.options : [item]);
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      placeholder = 'Select...',
      helperText,
      error,
      size = 'md',
      options,
      value,
      defaultValue,
      onChange,
      searchable = false,
      clearable = false,
      disabled = false,
      fullWidth = false,
      className = '',
      id,
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const currentValue = value !== undefined ? value : internalValue;
    const hasError = Boolean(error);
    const errorMessage = typeof error === 'string' ? error : undefined;

    const allOptions = flattenOptions(options);
    const filteredOptions = searchable && searchQuery
      ? allOptions.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : allOptions;

    const selectedOption = allOptions.find(opt => opt.value === currentValue);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
          setSearchQuery('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
      if (isOpen && listRef.current) {
        const highlighted = listRef.current.querySelector('[data-highlighted="true"]');
        highlighted?.scrollIntoView({ block: 'nearest' });
      }
    }, [highlightedIndex, isOpen]);

    const handleSelect = (optionValue: string) => {
      setInternalValue(optionValue);
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchQuery('');
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      setInternalValue('');
      onChange?.('');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (isOpen && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex].value);
          } else {
            setIsOpen(true);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex(i => Math.min(i + 1, filteredOptions.length - 1));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (isOpen) {
            setHighlightedIndex(i => Math.max(i - 1, 0));
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchQuery('');
          break;
      }
    };

    const wrapperClasses = [
      'oc-select-wrapper',
      fullWidth && 'oc-select-wrapper--full-width',
      className,
    ].filter(Boolean).join(' ');

    const triggerClasses = [
      'oc-select-trigger',
      `oc-select-trigger--${size}`,
      isOpen && 'oc-select-trigger--open',
      hasError && 'oc-select-trigger--error',
      disabled && 'oc-select-trigger--disabled',
    ].filter(Boolean).join(' ');

    const renderOptions = () => {
      if (searchable && searchQuery && filteredOptions.length === 0) {
        return <li className="oc-select-empty">No results found</li>;
      }

      let optionIndex = 0;
      return options.map((item, groupIndex) => {
        if (isOptionGroup(item)) {
          const groupOptions = item.options.filter(opt =>
            !searchable || !searchQuery || opt.label.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (groupOptions.length === 0) return null;

          return (
            <li key={groupIndex} className="oc-select-group">
              <div className="oc-select-group-label">{item.label}</div>
              <ul className="oc-select-group-options">
                {groupOptions.map(opt => {
                  const idx = optionIndex++;
                  return (
                    <li
                      key={opt.value}
                      className={[
                        'oc-select-option',
                        opt.value === currentValue && 'oc-select-option--selected',
                        opt.disabled && 'oc-select-option--disabled',
                        idx === highlightedIndex && 'oc-select-option--highlighted',
                      ].filter(Boolean).join(' ')}
                      data-highlighted={idx === highlightedIndex}
                      onClick={() => !opt.disabled && handleSelect(opt.value)}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                    >
                      {opt.label}
                      {opt.value === currentValue && (
                        <svg className="oc-select-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        }

        if (searchable && searchQuery && !item.label.toLowerCase().includes(searchQuery.toLowerCase())) {
          return null;
        }

        const idx = optionIndex++;
        return (
          <li
            key={item.value}
            className={[
              'oc-select-option',
              item.value === currentValue && 'oc-select-option--selected',
              item.disabled && 'oc-select-option--disabled',
              idx === highlightedIndex && 'oc-select-option--highlighted',
            ].filter(Boolean).join(' ')}
            data-highlighted={idx === highlightedIndex}
            onClick={() => !item.disabled && handleSelect(item.value)}
            onMouseEnter={() => setHighlightedIndex(idx)}
          >
            {item.label}
            {item.value === currentValue && (
              <svg className="oc-select-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </li>
        );
      });
    };

    return (
      <div className={wrapperClasses} ref={containerRef}>
        {label && (
          <label htmlFor={selectId} className="oc-select-label">
            {label}
          </label>
        )}
        <div
          ref={ref}
          className={triggerClasses}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          aria-invalid={hasError}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
        >
          {searchable && isOpen ? (
            <input
              ref={inputRef}
              className="oc-select-search"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={selectedOption?.label || placeholder}
              autoFocus
              onClick={e => e.stopPropagation()}
            />
          ) : (
            <span className={selectedOption ? 'oc-select-value' : 'oc-select-placeholder'}>
              {selectedOption?.label || placeholder}
            </span>
          )}
          <div className="oc-select-indicators">
            {clearable && currentValue && (
              <button
                type="button"
                className="oc-select-clear"
                onClick={handleClear}
                aria-label="Clear selection"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            <svg className="oc-select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
        {isOpen && (
          <ul
            ref={listRef}
            className="oc-select-dropdown"
            role="listbox"
            aria-labelledby={selectId}
          >
            {renderOptions()}
          </ul>
        )}
        {errorMessage && (
          <p className="oc-select-error">{errorMessage}</p>
        )}
        {helperText && !errorMessage && (
          <p className="oc-select-helper">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
