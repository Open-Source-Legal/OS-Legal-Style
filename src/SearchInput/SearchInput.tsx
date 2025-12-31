import React, { forwardRef, InputHTMLAttributes, useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';

export interface SearchSuggestion {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit'> {
  shortcut?: string;
  recentSearches?: string[];
  suggestions?: SearchSuggestion[];
  onSearch?: (query: string) => void;
  onClear?: () => void;
  loading?: boolean;
  fullWidth?: boolean;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      shortcut,
      recentSearches = [],
      suggestions = [],
      onSearch,
      onClear,
      loading = false,
      fullWidth = false,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      className = '',
      placeholder = 'Search...',
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string>(defaultValue !== undefined ? String(defaultValue) : '');
    const [isFocused, setIsFocused] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const currentValue = value !== undefined ? String(value) : internalValue;
    const hasValue = currentValue.length > 0;
    const dropdownItems: SearchSuggestion[] = hasValue ? suggestions : recentSearches.map((s, i) => ({ id: `recent-${i}`, label: s }));
    const shouldShowDropdown = showDropdown && dropdownItems.length > 0;

    // Combine refs
    const setRefs = useCallback((node: HTMLInputElement | null) => {
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    }, [ref]);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setShowDropdown(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(e);
      setHighlightedIndex(-1);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      setShowDropdown(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleClear = () => {
      setInternalValue('');
      onClear?.();
      inputRef.current?.focus();
    };

    const handleSearch = (query: string) => {
      onSearch?.(query);
      setShowDropdown(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && dropdownItems[highlightedIndex]) {
            handleSearch(dropdownItems[highlightedIndex].label);
          } else if (currentValue) {
            handleSearch(currentValue);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          setShowDropdown(true);
          setHighlightedIndex(i => Math.min(i + 1, dropdownItems.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(i => Math.max(i - 1, -1));
          break;
        case 'Escape':
          setShowDropdown(false);
          setHighlightedIndex(-1);
          break;
      }
    };

    const wrapperClasses = [
      'oc-search-input-wrapper',
      fullWidth && 'oc-search-input-wrapper--full-width',
      className,
    ].filter(Boolean).join(' ');

    const containerClasses = [
      'oc-search-input-container',
      isFocused && 'oc-search-input-container--focused',
    ].filter(Boolean).join(' ');

    return (
      <div ref={containerRef} className={wrapperClasses}>
        <div className={containerClasses}>
          <span className="oc-search-input-icon">
            {loading ? (
              <svg className="oc-search-input-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="10" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            )}
          </span>
          <input
            ref={setRefs}
            type="text"
            className="oc-search-input"
            placeholder={placeholder}
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            {...props}
          />
          {hasValue && (
            <button className="oc-search-input-clear" onClick={handleClear} aria-label="Clear search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          {shortcut && !hasValue && (
            <kbd className="oc-search-input-shortcut">{shortcut}</kbd>
          )}
        </div>
        {shouldShowDropdown && (
          <div className="oc-search-input-dropdown">
            {!hasValue && recentSearches.length > 0 && (
              <div className="oc-search-input-dropdown-header">Recent searches</div>
            )}
            {dropdownItems.map((item, index) => (
              <button
                key={item.id}
                className={[
                  'oc-search-input-dropdown-item',
                  index === highlightedIndex && 'oc-search-input-dropdown-item--highlighted',
                ].filter(Boolean).join(' ')}
                onClick={() => handleSearch(item.label)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {'icon' in item && item.icon ? (
                  <span className="oc-search-input-dropdown-item-icon">{item.icon}</span>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5 }}>
                    {hasValue ? (
                      <React.Fragment>
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                      </React.Fragment>
                    ) : (
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                )}
                <span className="oc-search-input-dropdown-item-label">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
