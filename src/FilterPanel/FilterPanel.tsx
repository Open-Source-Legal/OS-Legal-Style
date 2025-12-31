import React, { forwardRef, HTMLAttributes, useState, useEffect, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  description?: string;
}

export interface FilterSection {
  key: string;
  label: string;
  type: 'checkbox' | 'radio' | 'date-range';
  options?: FilterOption[];
  /** Enable search input for this section */
  searchable?: boolean;
  /** Placeholder text for search input */
  searchPlaceholder?: string;
  /** Loading state for async search */
  loading?: boolean;
  /** Max options to show before "Show more" */
  maxVisible?: number;
  /** Whether there are more options to load from server */
  hasMore?: boolean;
}

export interface FilterValues {
  [key: string]: string[] | { from?: string; to?: string };
}

export interface FilterPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  title?: string;
  sections: FilterSection[];
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  /** Called when user types in a searchable section (debounced) */
  onSearch?: (sectionKey: string, query: string) => void;
  /** Called when user clicks "Load more" */
  onLoadMore?: (sectionKey: string) => void;
  onApply?: () => void;
  onCancel?: () => void;
  showFooter?: boolean;
  showQuickFilters?: boolean;
  quickFilterKeys?: string[];
  /** Debounce delay for search in ms */
  searchDebounce?: number;
}

// ═══════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M11.667 3.5L5.25 9.917 2.333 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
    <path d="M1.707.293A1 1 0 00.293 1.707L3.586 5 .293 8.293a1 1 0 101.414 1.414L5 6.414l3.293 3.293a1 1 0 001.414-1.414L6.414 5l3.293-3.293A1 1 0 008.293.293L5 3.586 1.707.293z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M6 1a5 5 0 014.33 7.498l3.086 3.086a.75.75 0 01-1.06 1.06l-3.086-3.085A5 5 0 116 1zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="oc-filter-panel__spinner">
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
    <path
      d="M7 1a6 6 0 016 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <path d="M2.22 4.22a.75.75 0 011.06 0L6 6.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L2.22 5.28a.75.75 0 010-1.06z" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ═══════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

interface FilterCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  count?: number;
  description?: string;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ checked, onChange, label, count, description }) => (
  <label className="oc-filter-panel__option">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      style={{ display: 'none' }}
    />
    <span
      className={`oc-filter-panel__checkbox ${checked ? 'oc-filter-panel__checkbox--checked' : ''}`}
    >
      {checked && <CheckIcon />}
    </span>
    <span className="oc-filter-panel__option-content">
      <span className="oc-filter-panel__option-label">{label}</span>
      {description && (
        <span className="oc-filter-panel__option-description">{description}</span>
      )}
    </span>
    {count !== undefined && (
      <span className="oc-filter-panel__option-count">{count}</span>
    )}
  </label>
);

interface FilterRadioProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
  description?: string;
}

const FilterRadio: React.FC<FilterRadioProps> = ({ checked, onChange, label, count, description }) => (
  <label className="oc-filter-panel__option" onClick={onChange}>
    <span
      className={`oc-filter-panel__radio ${checked ? 'oc-filter-panel__radio--checked' : ''}`}
    >
      {checked && <span className="oc-filter-panel__radio-dot" />}
    </span>
    <span className="oc-filter-panel__option-content">
      <span className="oc-filter-panel__option-label">{label}</span>
      {description && (
        <span className="oc-filter-panel__option-description">{description}</span>
      )}
    </span>
    {count !== undefined && (
      <span className="oc-filter-panel__option-count">{count}</span>
    )}
  </label>
);

interface SectionSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
}

const SectionSearch: React.FC<SectionSearchProps> = ({ value, onChange, placeholder, loading }) => (
  <div className="oc-filter-panel__search">
    <span className="oc-filter-panel__search-icon">
      {loading ? <SpinnerIcon /> : <SearchIcon />}
    </span>
    <input
      type="text"
      className="oc-filter-panel__search-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || 'Search...'}
    />
    {value && (
      <button
        className="oc-filter-panel__search-clear"
        onClick={() => onChange('')}
        type="button"
      >
        <CloseIcon />
      </button>
    )}
  </div>
);

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export const FilterPanel = forwardRef<HTMLDivElement, FilterPanelProps>(
  (
    {
      title = 'Filters',
      sections,
      values,
      onChange,
      onSearch,
      onLoadMore,
      onApply,
      onCancel,
      showFooter = true,
      showQuickFilters = false,
      quickFilterKeys = [],
      searchDebounce = 300,
      className = '',
      ...props
    },
    ref
  ) => {
    // Track search queries per section
    const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});
    // Track expanded state per section
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    // Debounced search queries
    const debouncedQueries = useDebounce(searchQueries, searchDebounce);

    // Call onSearch when debounced query changes
    useEffect(() => {
      if (onSearch) {
        Object.entries(debouncedQueries).forEach(([key, query]) => {
          onSearch(key, query);
        });
      }
    }, [debouncedQueries, onSearch]);

    const handleSearchChange = (sectionKey: string, query: string) => {
      setSearchQueries((prev) => ({ ...prev, [sectionKey]: query }));
    };

    const toggleExpanded = (sectionKey: string) => {
      setExpandedSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
    };

    const handleCheckboxChange = (sectionKey: string, optionValue: string, checked: boolean) => {
      const currentValues = (values[sectionKey] as string[]) || [];
      const newValues = checked
        ? [...currentValues, optionValue]
        : currentValues.filter((v) => v !== optionValue);
      onChange({ ...values, [sectionKey]: newValues });
    };

    const handleRadioChange = (sectionKey: string, optionValue: string) => {
      onChange({ ...values, [sectionKey]: [optionValue] });
    };

    const handleDateChange = (sectionKey: string, field: 'from' | 'to', value: string) => {
      const currentRange = (values[sectionKey] as { from?: string; to?: string }) || {};
      onChange({
        ...values,
        [sectionKey]: { ...currentRange, [field]: value },
      });
    };

    const handleClearAll = () => {
      const clearedValues: FilterValues = {};
      sections.forEach((section) => {
        if (section.type === 'date-range') {
          clearedValues[section.key] = { from: '', to: '' };
        } else {
          clearedValues[section.key] = [];
        }
      });
      onChange(clearedValues);
      setSearchQueries({});
    };

    const getActiveFilterCount = () => {
      let count = 0;
      Object.entries(values).forEach(([, val]) => {
        if (Array.isArray(val)) {
          count += val.length;
        } else if (val && (val.from || val.to)) {
          count += 1;
        }
      });
      return count;
    };

    const activeCount = getActiveFilterCount();

    const getSelectedCount = (sectionKey: string) => {
      const val = values[sectionKey];
      if (Array.isArray(val)) return val.length;
      if (val && (val.from || val.to)) return 1;
      return 0;
    };

    // Filter options by search query (client-side filtering when not using async)
    const getFilteredOptions = (section: FilterSection) => {
      const options = section.options || [];
      const query = searchQueries[section.key]?.toLowerCase() || '';

      if (!query || onSearch) {
        // If using async search, don't filter client-side
        return options;
      }

      return options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(query) ||
          opt.description?.toLowerCase().includes(query)
      );
    };

    // Get visible options based on maxVisible and expanded state
    const getVisibleOptions = (section: FilterSection) => {
      const filtered = getFilteredOptions(section);
      const maxVisible = section.maxVisible || filtered.length;
      const isExpanded = expandedSections[section.key];

      if (isExpanded || filtered.length <= maxVisible) {
        return filtered;
      }

      return filtered.slice(0, maxVisible);
    };

    // Get quick filter items
    const getQuickFilters = () => {
      const items: { sectionKey: string; label: string; value: string }[] = [];
      quickFilterKeys.forEach((key) => {
        const section = sections.find((s) => s.key === key);
        if (!section || !section.options) return;
        const selectedValues = (values[key] as string[]) || [];
        selectedValues.forEach((val) => {
          const option = section.options?.find((o) => o.value === val);
          if (option) {
            items.push({ sectionKey: key, label: option.label, value: val });
          }
        });
      });
      return items;
    };

    const quickFilters = showQuickFilters ? getQuickFilters() : [];

    const removeQuickFilter = (sectionKey: string, value: string) => {
      const currentValues = (values[sectionKey] as string[]) || [];
      onChange({
        ...values,
        [sectionKey]: currentValues.filter((v) => v !== value),
      });
    };

    return (
      <div
        ref={ref}
        className={['oc-filter-panel', className].filter(Boolean).join(' ')}
        {...props}
      >
        <div className="oc-filter-panel__header">
          <h3 className="oc-filter-panel__title">{title}</h3>
          <button
            className="oc-filter-panel__clear"
            onClick={handleClearAll}
            disabled={activeCount === 0}
          >
            Clear all
          </button>
        </div>

        {showQuickFilters && quickFilters.length > 0 && (
          <div className="oc-filter-panel__quick-filters">
            {quickFilters.map((filter, i) => (
              <span key={i} className="oc-filter-panel__quick-chip oc-filter-panel__quick-chip--active">
                {filter.label}
                <button
                  className="oc-filter-panel__quick-chip-remove"
                  onClick={() => removeQuickFilter(filter.sectionKey, filter.value)}
                >
                  <CloseIcon />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="oc-filter-panel__body">
          {sections.map((section) => {
            const filteredOptions = getFilteredOptions(section);
            const visibleOptions = getVisibleOptions(section);
            const hiddenCount = filteredOptions.length - visibleOptions.length;
            const isExpanded = expandedSections[section.key];
            const selectedCount = getSelectedCount(section.key);

            return (
              <div key={section.key} className="oc-filter-panel__section">
                <div className="oc-filter-panel__section-header">
                  <h4 className="oc-filter-panel__section-title">{section.label}</h4>
                  {selectedCount > 0 && (
                    <span className="oc-filter-panel__section-count">
                      {selectedCount}
                    </span>
                  )}
                </div>

                {section.searchable && (
                  <SectionSearch
                    value={searchQueries[section.key] || ''}
                    onChange={(query) => handleSearchChange(section.key, query)}
                    placeholder={section.searchPlaceholder}
                    loading={section.loading}
                  />
                )}

                {section.type === 'checkbox' && (
                  <div className="oc-filter-panel__options">
                    {visibleOptions.map((option) => (
                      <FilterCheckbox
                        key={option.value}
                        checked={((values[section.key] as string[]) || []).includes(option.value)}
                        onChange={(checked) =>
                          handleCheckboxChange(section.key, option.value, checked)
                        }
                        label={option.label}
                        count={option.count}
                        description={option.description}
                      />
                    ))}

                    {section.loading && visibleOptions.length === 0 && (
                      <div className="oc-filter-panel__loading">
                        <SpinnerIcon /> Loading...
                      </div>
                    )}

                    {!section.loading && visibleOptions.length === 0 && searchQueries[section.key] && (
                      <div className="oc-filter-panel__empty">
                        No results for "{searchQueries[section.key]}"
                      </div>
                    )}

                    {(hiddenCount > 0 || section.hasMore) && (
                      <button
                        className="oc-filter-panel__show-more"
                        onClick={() => {
                          if (section.hasMore && onLoadMore) {
                            onLoadMore(section.key);
                          } else {
                            toggleExpanded(section.key);
                          }
                        }}
                      >
                        <ChevronDownIcon />
                        {isExpanded ? 'Show less' : `Show ${hiddenCount || 'more'} more`}
                      </button>
                    )}
                  </div>
                )}

                {section.type === 'radio' && (
                  <div className="oc-filter-panel__options">
                    {visibleOptions.map((option) => (
                      <FilterRadio
                        key={option.value}
                        checked={((values[section.key] as string[]) || [])[0] === option.value}
                        onChange={() => handleRadioChange(section.key, option.value)}
                        label={option.label}
                        count={option.count}
                        description={option.description}
                      />
                    ))}
                  </div>
                )}

                {section.type === 'date-range' && (
                  <div className="oc-filter-panel__date-inputs">
                    <div className="oc-filter-panel__date-field">
                      <label className="oc-filter-panel__date-label">From</label>
                      <input
                        type="date"
                        className="oc-filter-panel__date-input"
                        value={
                          ((values[section.key] as { from?: string; to?: string }) || {}).from || ''
                        }
                        onChange={(e) => handleDateChange(section.key, 'from', e.target.value)}
                      />
                    </div>
                    <div className="oc-filter-panel__date-field">
                      <label className="oc-filter-panel__date-label">To</label>
                      <input
                        type="date"
                        className="oc-filter-panel__date-input"
                        value={
                          ((values[section.key] as { from?: string; to?: string }) || {}).to || ''
                        }
                        onChange={(e) => handleDateChange(section.key, 'to', e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showFooter && (
          <div className="oc-filter-panel__footer">
            {activeCount > 0 && (
              <span className="oc-filter-panel__active-count">
                <strong>{activeCount}</strong> filter{activeCount !== 1 ? 's' : ''} active
              </span>
            )}
            <div className="oc-filter-panel__footer-spacer" />
            {onCancel && (
              <button
                className="oc-filter-panel__btn oc-filter-panel__btn--secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
            {onApply && (
              <button
                className="oc-filter-panel__btn oc-filter-panel__btn--primary"
                onClick={onApply}
              >
                Apply Filters
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

FilterPanel.displayName = 'FilterPanel';
