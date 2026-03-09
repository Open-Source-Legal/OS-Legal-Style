import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  ReactNode,
  KeyboardEvent,
  HTMLAttributes,
  createContext,
  useContext,
} from 'react';

// ─── Types ────────────────────────────────────────────────────────────────

export interface DropdownOption<T extends string | number = string> {
  /** Unique value used for selection identity. */
  value: T;
  /** Display label shown in the trigger and as default option text. */
  label: string;
  /** Optional icon — a ReactNode (e.g., a Lucide icon) or image URL string. */
  icon?: ReactNode | string;
  /** Override icon size in px for this option. Falls back to the
   *  component-level `iconSize` prop, then to 16. */
  iconSize?: number;
  /** Optional secondary text shown below the label in the menu. */
  description?: string;
  /** Disables this individual option. */
  disabled?: boolean;
  /** Arbitrary data attached to the option, passed through to onChange. */
  data?: unknown;
}

export interface TriggerRenderProps<T extends string | number = string> {
  isOpen: boolean;
  selectedValue: T | T[] | null;
  selectedOption: DropdownOption<T> | DropdownOption<T>[] | null;
  placeholder: string;
  disabled: boolean;
  loading: boolean;
}

export type DropdownMode = 'menu' | 'select' | 'multiselect';

export type DropdownSize = 'sm' | 'md' | 'lg';

export interface DropdownProps<T extends string | number = string> {
  /** Behavioral mode. Determines selection semantics and ARIA role. */
  mode: DropdownMode;

  /** Visual density size. Controls trigger height, padding, and font size.
   *  Defaults to 'md'. */
  size?: DropdownSize;

  /** Option definitions. Not required for mode="menu" when using
   *  Dropdown.Item children directly. */
  options?: DropdownOption<T>[];

  /** Current value (controlled). Single value for "select", array for
   *  "multiselect". Ignored for "menu". */
  value?: T | T[] | null;

  /** Default value (uncontrolled). */
  defaultValue?: T | T[] | null;

  /** Selection change handler. */
  onChange?: (
    value: T | T[] | null,
    option: DropdownOption<T> | DropdownOption<T>[] | null
  ) => void;

  /** Placeholder text shown when no value is selected. */
  placeholder?: string;

  /** Disables the entire dropdown. */
  disabled?: boolean;

  /** Shows a loading spinner in the menu and/or trigger. */
  loading?: boolean;

  /** Allows clearing the selection back to null/empty. */
  clearable?: boolean;

  /** Enables search input for filtering options. */
  searchable?: false | 'local' | 'async';

  /** Called when the search input value changes. */
  onSearchChange?: (query: string) => void;

  /** Debounce interval in ms for onSearchChange. Defaults to 300. */
  searchDebounceMs?: number;

  /** Default icon size in px for option icons. Individual options can
   *  override via their own `iconSize`. Defaults to 16. */
  iconSize?: number;

  /** Makes the dropdown fill its container width. */
  fluid?: boolean;

  /** Menu opens upward instead of downward. */
  upward?: boolean;

  /** Menu horizontal alignment relative to trigger. */
  align?: 'left' | 'right';

  /** Custom trigger element. */
  trigger?: ReactNode | ((state: TriggerRenderProps<T>) => ReactNode);

  /** Custom option renderer. */
  renderOption?: (
    option: DropdownOption<T>,
    state: { isFocused: boolean; isSelected: boolean }
  ) => ReactNode;

  /** Custom renderer for selected value tags in multiselect mode. */
  renderTag?: (
    option: DropdownOption<T>,
    onRemove: () => void
  ) => ReactNode;

  /** Custom renderer for the "no options" empty state. */
  renderEmpty?: () => ReactNode;

  /** Maximum height for the dropdown menu in px before scrolling. */
  maxMenuHeight?: number;

  /** Additional class name on the root container. */
  className?: string;

  /** Inline styles on the root container. */
  style?: React.CSSProperties;

  /** Accessible label. */
  'aria-label'?: string;

  /** ID of an external label element. */
  'aria-labelledby'?: string;

  /** Called when the dropdown opens. */
  onOpen?: () => void;

  /** Called when the dropdown closes. */
  onClose?: () => void;

  /** Called when focus leaves the dropdown's DOM tree (trigger + menu).
   *  Fires for tab-away, click-outside, and programmatic focus changes —
   *  even when the menu was never opened. Internal focus transfers between
   *  trigger and menu are suppressed. */
  onBlur?: (event: React.FocusEvent) => void;

  /** Allow option description text to wrap instead of truncating.
   *  When false (default), descriptions are single-line with ellipsis. */
  wrapDescriptions?: boolean;

  /** Show the selected option's description in the trigger alongside
   *  the label. Only applies in "select" mode with the default trigger. */
  showDescriptionInTrigger?: boolean;

  /** Children — used for compound component pattern (Dropdown.Item, etc.) */
  children?: ReactNode;
}

// ─── Compound component types ─────────────────────────────────────────────

export interface DropdownItemProps {
  /** Click handler for this action. */
  onClick?: () => void;
  /** Optional icon preceding the label. */
  icon?: ReactNode;
  /** Disables the item. */
  disabled?: boolean;
  /** Item content. */
  children: ReactNode;
}

export interface DropdownHeaderProps {
  children: ReactNode;
}

// ─── Context for compound children ────────────────────────────────────────

interface DropdownContextValue {
  focusedIndex: number;
  onItemClick: (index: number, handler?: () => void) => void;
  registerItem: () => number;
  onItemMouseEnter: (index: number) => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

// ─── Compound components ──────────────────────────────────────────────────

let itemCounter = 0;

const DropdownItem = ({ onClick, icon, disabled = false, children }: DropdownItemProps) => {
  const ctx = useContext(DropdownContext);
  const indexRef = useRef<number>(-1);

  if (indexRef.current === -1 && ctx) {
    indexRef.current = ctx.registerItem();
  }
  const index = indexRef.current;

  const isFocused = ctx ? ctx.focusedIndex === index : false;

  const classes = [
    'oc-dropdown__item',
    isFocused && 'oc-dropdown__item--focused',
    disabled && 'oc-dropdown__item--disabled',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      role="menuitem"
      tabIndex={-1}
      aria-disabled={disabled || undefined}
      onClick={() => {
        if (!disabled && ctx) {
          ctx.onItemClick(index, onClick);
        }
      }}
      onMouseEnter={() => {
        if (!disabled && ctx) {
          ctx.onItemMouseEnter(index);
        }
      }}
      data-oc-dropdown-item
      data-oc-dropdown-index={index}
    >
      {icon && <span className="oc-dropdown__item-icon">{icon}</span>}
      <span className="oc-dropdown__item-label">{children}</span>
    </div>
  );
};

DropdownItem.displayName = 'Dropdown.Item';

const DropdownDivider = () => (
  <div className="oc-dropdown__divider" role="separator" />
);

DropdownDivider.displayName = 'Dropdown.Divider';

const DropdownHeader = ({ children }: DropdownHeaderProps) => (
  <div className="oc-dropdown__header" role="presentation">
    {children}
  </div>
);

DropdownHeader.displayName = 'Dropdown.Header';

// ─── SVG Icons ────────────────────────────────────────────────────────────

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ClearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const SpinnerIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const TagRemoveIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────

function useDebounce(callback: (value: string) => void, delay: number) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return useCallback(
    (value: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => callbackRef.current(value), delay);
    },
    [delay]
  );
}

// Count interactive items (Dropdown.Item) in children
function countMenuItems(children: ReactNode): number {
  let count = 0;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === DropdownItem) {
      count++;
    }
  });
  return count;
}

// ─── Main Component ───────────────────────────────────────────────────────

function DropdownInner<T extends string | number = string>(
  {
    mode,
    size = 'md',
    options = [],
    value,
    defaultValue,
    onChange,
    placeholder = mode === 'menu' ? '' : 'Select...',
    disabled = false,
    loading = false,
    clearable,
    searchable = false,
    onSearchChange,
    searchDebounceMs = 300,
    iconSize,
    fluid = false,
    upward = false,
    align = 'left',
    trigger,
    renderOption,
    renderTag,
    renderEmpty,
    wrapDescriptions = false,
    showDescriptionInTrigger = false,
    maxMenuHeight = 300,
    className = '',
    style,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    onOpen,
    onClose,
    onBlur,
    children,
  }: DropdownProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const generatedId = useId();
  const baseId = `oc-dropdown-${generatedId}`;
  const menuId = `${baseId}-menu`;
  const triggerId = `${baseId}-trigger`;

  // Resolve clearable default
  const isClearable = clearable !== undefined ? clearable : mode !== 'menu';

  // State
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [internalValue, setInternalValue] = useState<T | T[] | null>(() => {
    if (defaultValue !== undefined) return defaultValue;
    if (mode === 'multiselect') return [] as unknown as T[];
    return null;
  });

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerElRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const itemCounterRef = useRef(0);

  // Controlled vs. uncontrolled
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Debounced async search
  const debouncedSearch = useDebounce(
    (q: string) => onSearchChange?.(q),
    searchDebounceMs
  );

  // Filter options for local search
  const filteredOptions = searchable === 'local' && searchQuery
    ? options.filter(opt =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Selection helpers
  const getSelectedOption = useCallback((): DropdownOption<T> | DropdownOption<T>[] | null => {
    if (mode === 'menu') return null;
    if (mode === 'multiselect') {
      const vals = (currentValue as T[] | null) || [];
      return options.filter(opt => vals.includes(opt.value));
    }
    if (currentValue == null) return null;
    return options.find(opt => opt.value === currentValue) || null;
  }, [mode, currentValue, options]);

  const isSelected = useCallback(
    (optValue: T): boolean => {
      if (mode === 'multiselect') {
        return ((currentValue as T[] | null) || []).includes(optValue);
      }
      return currentValue === optValue;
    },
    [mode, currentValue]
  );

  // Open/close
  const open = useCallback(() => {
    if (disabled || isOpen) return;
    setIsOpen(true);
    itemCounterRef.current = 0;

    // Set initial focus index
    if (mode !== 'menu' && currentValue != null && !Array.isArray(currentValue)) {
      const idx = filteredOptions.findIndex(opt => opt.value === currentValue);
      setFocusedIndex(idx >= 0 ? idx : 0);
    } else {
      setFocusedIndex(mode === 'menu' ? 0 : (searchable ? -1 : 0));
    }

    onOpen?.();
  }, [disabled, isOpen, mode, currentValue, filteredOptions, searchable, onOpen]);

  const close = useCallback(() => {
    if (!isOpen) return;
    setIsOpen(false);
    setSearchQuery('');
    setFocusedIndex(-1);
    onClose?.();
    // Return focus to trigger
    triggerElRef.current?.focus();
  }, [isOpen, onClose]);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  // Selection
  const handleSelect = useCallback(
    (optValue: T) => {
      const opt = options.find(o => o.value === optValue);
      if (!opt || opt.disabled) return;

      if (mode === 'menu') {
        // Menu mode: nothing to select, just close
        close();
        return;
      }

      if (mode === 'multiselect') {
        const currentArr = ((currentValue as T[] | null) || []) as T[];
        let newArr: T[];
        if (currentArr.includes(optValue)) {
          newArr = currentArr.filter(v => v !== optValue);
        } else {
          newArr = [...currentArr, optValue];
        }
        if (!isControlled) {
          setInternalValue(newArr as unknown as T[]);
        }
        const selectedOpts = options.filter(o => newArr.includes(o.value));
        onChange?.(newArr as unknown as T[], selectedOpts);
        // Stay open for multiselect
      } else {
        // Single select
        if (!isControlled) {
          setInternalValue(optValue);
        }
        onChange?.(optValue, opt);
        close();
      }
    },
    [mode, options, currentValue, isControlled, onChange, close]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (mode === 'multiselect') {
        if (!isControlled) setInternalValue([] as unknown as T[]);
        onChange?.([] as unknown as T[], []);
      } else {
        if (!isControlled) setInternalValue(null);
        onChange?.(null, null);
      }
    },
    [mode, isControlled, onChange]
  );

  const handleRemoveTag = useCallback(
    (optValue: T) => {
      const currentArr = ((currentValue as T[] | null) || []) as T[];
      const newArr = currentArr.filter(v => v !== optValue);
      if (!isControlled) {
        setInternalValue(newArr as unknown as T[]);
      }
      const selectedOpts = options.filter(o => newArr.includes(o.value));
      onChange?.(newArr as unknown as T[], selectedOpts);
    },
    [currentValue, isControlled, options, onChange]
  );

  // Search
  const handleSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const q = e.target.value;
      setSearchQuery(q);
      setFocusedIndex(0);

      if (searchable === 'async') {
        debouncedSearch(q);
      }
    },
    [searchable, debouncedSearch]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setFocusedIndex(0);
    if (searchable === 'async') {
      onSearchChange?.('');
    }
    searchInputRef.current?.focus();
  }, [searchable, onSearchChange]);

  // Click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close]);

  // Focus search when opened with searchable
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (!isOpen || focusedIndex < 0 || !menuRef.current) return;
    const item = menuRef.current.querySelector(
      `[data-oc-dropdown-index="${focusedIndex}"]`
    );
    if (item && typeof item.scrollIntoView === 'function') {
      item.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex, isOpen]);

  // Count items for keyboard nav boundary
  const menuItemCount = mode === 'menu' ? countMenuItems(children) : filteredOptions.length;

  // Get the list of non-disabled option indices for keyboard nav
  const getNavigableIndices = useCallback((): number[] => {
    if (mode === 'menu') {
      // For menu mode, we don't know disabled state easily, return all
      return Array.from({ length: menuItemCount }, (_, i) => i);
    }
    return filteredOptions
      .map((opt, i) => (opt.disabled ? -1 : i))
      .filter(i => i >= 0);
  }, [mode, menuItemCount, filteredOptions]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (disabled) return;

      const navigable = getNavigableIndices();

      if (!isOpen) {
        if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
          e.preventDefault();
          open();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          const currentPos = navigable.indexOf(focusedIndex);
          if (currentPos < navigable.length - 1) {
            setFocusedIndex(navigable[currentPos + 1]);
          } else if (focusedIndex === -1 && navigable.length > 0) {
            setFocusedIndex(navigable[0]);
          }
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const currentPos = navigable.indexOf(focusedIndex);
          if (currentPos > 0) {
            setFocusedIndex(navigable[currentPos - 1]);
          }
          break;
        }
        case 'Home': {
          e.preventDefault();
          if (navigable.length > 0) setFocusedIndex(navigable[0]);
          break;
        }
        case 'End': {
          e.preventDefault();
          if (navigable.length > 0) setFocusedIndex(navigable[navigable.length - 1]);
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (focusedIndex >= 0) {
            if (mode === 'menu') {
              // Compound children handle their own onClick via context
              // This is handled via the context's onItemClick
            } else {
              const opt = filteredOptions[focusedIndex];
              if (opt && !opt.disabled) handleSelect(opt.value);
            }
          }
          break;
        }
        case ' ': {
          // Don't capture space when search input is focused
          if (searchable && document.activeElement === searchInputRef.current) {
            return;
          }
          e.preventDefault();
          if (focusedIndex >= 0) {
            if (mode !== 'menu') {
              const opt = filteredOptions[focusedIndex];
              if (opt && !opt.disabled) handleSelect(opt.value);
            }
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          close();
          break;
        }
        case 'Tab': {
          close();
          break;
        }
        default: {
          // Type-ahead for non-searchable, non-multiselect
          if (
            !searchable &&
            mode !== 'multiselect' &&
            e.key.length === 1 &&
            !e.ctrlKey &&
            !e.metaKey
          ) {
            const char = e.key.toLowerCase();
            const startIdx = focusedIndex + 1;
            // Search from current position to end, then wrap
            for (let i = 0; i < filteredOptions.length; i++) {
              const idx = (startIdx + i) % filteredOptions.length;
              const opt = filteredOptions[idx];
              if (!opt.disabled && opt.label.toLowerCase().startsWith(char)) {
                setFocusedIndex(idx);
                break;
              }
            }
          }
          break;
        }
      }
    },
    [
      disabled,
      isOpen,
      focusedIndex,
      mode,
      filteredOptions,
      searchable,
      open,
      close,
      handleSelect,
      getNavigableIndices,
    ]
  );

  // Menu-mode context: handle Enter key for compound children
  const menuKeyEnterRef = useRef<(() => void) | null>(null);

  const handleMenuKeyDown = useCallback(
    (e: KeyboardEvent) => {
      handleKeyDown(e);

      if (e.key === 'Enter' && isOpen && mode === 'menu' && focusedIndex >= 0) {
        // Find the item at focusedIndex and trigger its click
        if (menuRef.current) {
          const item = menuRef.current.querySelector(
            `[data-oc-dropdown-index="${focusedIndex}"]`
          ) as HTMLElement | null;
          item?.click();
        }
      }
    },
    [handleKeyDown, isOpen, mode, focusedIndex]
  );

  // Context value for compound children
  const contextValue: DropdownContextValue = {
    focusedIndex,
    registerItem: () => {
      return itemCounterRef.current++;
    },
    onItemClick: (_index: number, handler?: () => void) => {
      handler?.();
      close();
    },
    onItemMouseEnter: (index: number) => {
      setFocusedIndex(index);
    },
  };

  // Determine what's selected for display
  const selectedOpt = getSelectedOption();
  const hasValue = mode === 'multiselect'
    ? ((currentValue as T[] | null) || []).length > 0
    : currentValue != null;

  // ─── Render helpers ───────────────────────────────────────────────────

  const renderIcon = (icon: ReactNode | string, size?: number) => {
    const sizeStyle = size ? { '--oc-dropdown-icon-size': `${size}px` } as React.CSSProperties : undefined;
    if (typeof icon === 'string') {
      return <img src={icon} alt="" className="oc-dropdown__option-icon-img" style={sizeStyle} />;
    }
    if (size) {
      return <span style={sizeStyle}>{icon}</span>;
    }
    return icon;
  };

  const renderDefaultTrigger = () => {
    if (mode === 'multiselect' && hasValue) {
      const selectedArr = (selectedOpt as DropdownOption<T>[]) || [];
      return (
        <div className="oc-dropdown__trigger-content">
          <div className="oc-dropdown__tags">
            {selectedArr.map(opt => {
              if (renderTag) {
                return (
                  <span key={String(opt.value)}>
                    {renderTag(opt, () => handleRemoveTag(opt.value))}
                  </span>
                );
              }
              return (
                <span key={String(opt.value)} className="oc-dropdown__tag">
                  <span className="oc-dropdown__tag-label">{opt.label}</span>
                  <button
                    type="button"
                    className="oc-dropdown__tag-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTag(opt.value);
                    }}
                    aria-label={`Remove ${opt.label}`}
                  >
                    <TagRemoveIcon />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      );
    }

    if (mode === 'select' && selectedOpt && !Array.isArray(selectedOpt)) {
      return (
        <div className="oc-dropdown__trigger-content">
          {selectedOpt.icon && (
            <span className="oc-dropdown__trigger-icon">
              {renderIcon(selectedOpt.icon, selectedOpt.iconSize ?? iconSize)}
            </span>
          )}
          {showDescriptionInTrigger && selectedOpt.description ? (
            <div className="oc-dropdown__trigger-value-group">
              <span className="oc-dropdown__value">{selectedOpt.label}</span>
              <span className="oc-dropdown__trigger-description">{selectedOpt.description}</span>
            </div>
          ) : (
            <span className="oc-dropdown__value">{selectedOpt.label}</span>
          )}
        </div>
      );
    }

    return (
      <div className="oc-dropdown__trigger-content">
        <span className="oc-dropdown__placeholder">{placeholder}</span>
      </div>
    );
  };

  const renderTriggerElement = () => {
    const triggerProps: TriggerRenderProps<T> = {
      isOpen,
      selectedValue: currentValue as T | T[] | null,
      selectedOption: selectedOpt as DropdownOption<T> | DropdownOption<T>[] | null,
      placeholder,
      disabled,
      loading,
    };

    if (trigger) {
      const triggerContent = typeof trigger === 'function'
        ? trigger(triggerProps)
        : trigger;

      return (
        <div
          ref={triggerElRef}
          className="oc-dropdown__trigger oc-dropdown__trigger--custom"
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup={mode === 'menu' ? 'menu' : 'listbox'}
          aria-expanded={isOpen}
          aria-disabled={disabled || undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          id={triggerId}
          onClick={() => !disabled && toggle()}
          onKeyDown={mode === 'menu' ? handleMenuKeyDown : handleKeyDown}
        >
          {triggerContent}
        </div>
      );
    }

    // Default trigger
    const triggerClasses = [
      'oc-dropdown__trigger',
      isOpen && 'oc-dropdown__trigger--open',
      disabled && 'oc-dropdown__trigger--disabled',
      hasValue && 'oc-dropdown__trigger--has-value',
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={triggerElRef}
        className={triggerClasses}
        role={mode === 'menu' ? 'button' : 'combobox'}
        tabIndex={disabled ? -1 : 0}
        aria-haspopup={mode === 'menu' ? 'menu' : 'listbox'}
        aria-expanded={isOpen}
        aria-disabled={disabled || undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-activedescendant={
          isOpen && focusedIndex >= 0 && mode !== 'menu'
            ? `${baseId}-option-${focusedIndex}`
            : undefined
        }
        id={triggerId}
        onClick={() => !disabled && toggle()}
        onKeyDown={mode === 'menu' ? handleMenuKeyDown : handleKeyDown}
      >
        {renderDefaultTrigger()}
        <div className="oc-dropdown__indicators">
          {isClearable && hasValue && !disabled && (
            <button
              type="button"
              className="oc-dropdown__clear"
              onClick={handleClear}
              aria-label="Clear selection"
              tabIndex={-1}
            >
              <ClearIcon />
            </button>
          )}
          {loading ? (
            <SpinnerIcon className="oc-dropdown__spinner" />
          ) : (
            <span className="oc-dropdown__chevron">
              <ChevronIcon />
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderMenuContent = () => {
    if (mode === 'menu') {
      return (
        <DropdownContext.Provider value={contextValue}>
          {children}
        </DropdownContext.Provider>
      );
    }

    // Options-based rendering for select/multiselect
    if (loading && filteredOptions.length === 0) {
      return (
        <div className="oc-dropdown__loading">
          <SpinnerIcon className="oc-dropdown__spinner" />
          <span>Loading...</span>
        </div>
      );
    }

    if (filteredOptions.length === 0) {
      if (renderEmpty) return renderEmpty();
      return (
        <div className="oc-dropdown__empty">
          No results found
        </div>
      );
    }

    return filteredOptions.map((opt, index) => {
      const isFocused = index === focusedIndex;
      const selected = isSelected(opt.value);

      if (renderOption) {
        return (
          <div
            key={String(opt.value)}
            className={[
              'oc-dropdown__option',
              isFocused && 'oc-dropdown__option--focused',
              selected && 'oc-dropdown__option--selected',
              opt.disabled && 'oc-dropdown__option--disabled',
            ].filter(Boolean).join(' ')}
            role="option"
            id={`${baseId}-option-${index}`}
            aria-selected={selected}
            aria-disabled={opt.disabled || undefined}
            tabIndex={-1}
            onClick={() => !opt.disabled && handleSelect(opt.value)}
            onMouseEnter={() => !opt.disabled && setFocusedIndex(index)}
            data-oc-dropdown-index={index}
          >
            {renderOption(opt, { isFocused, isSelected: selected })}
          </div>
        );
      }

      const optClasses = [
        'oc-dropdown__option',
        isFocused && 'oc-dropdown__option--focused',
        selected && 'oc-dropdown__option--selected',
        opt.disabled && 'oc-dropdown__option--disabled',
      ].filter(Boolean).join(' ');

      return (
        <div
          key={String(opt.value)}
          className={optClasses}
          role="option"
          id={`${baseId}-option-${index}`}
          aria-selected={selected}
          aria-disabled={opt.disabled || undefined}
          tabIndex={-1}
          onClick={() => !opt.disabled && handleSelect(opt.value)}
          onMouseEnter={() => !opt.disabled && setFocusedIndex(index)}
          data-oc-dropdown-index={index}
        >
          {opt.icon && (
            <span className="oc-dropdown__option-icon">
              {renderIcon(opt.icon, opt.iconSize ?? iconSize)}
            </span>
          )}
          <div className="oc-dropdown__option-content">
            <span className="oc-dropdown__option-label">{opt.label}</span>
            {opt.description && (
              <span className="oc-dropdown__option-description">
                {opt.description}
              </span>
            )}
          </div>
          {selected && (
            <span className="oc-dropdown__option-check">
              <CheckIcon />
            </span>
          )}
        </div>
      );
    });
  };

  const renderMenu = () => {
    if (!isOpen) return null;

    const menuRole = mode === 'menu' ? 'menu' : 'listbox';

    const menuClasses = [
      'oc-dropdown__menu',
      upward && 'oc-dropdown__menu--upward',
      align === 'right' && 'oc-dropdown__menu--align-right',
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={menuRef}
        className={menuClasses}
        role={menuRole}
        id={menuId}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy || triggerId}
        aria-multiselectable={mode === 'multiselect' ? true : undefined}
        style={{ maxHeight: maxMenuHeight }}
      >
        {searchable && (
          <div className="oc-dropdown__search">
            <span className="oc-dropdown__search-icon">
              <SearchIcon />
            </span>
            <input
              ref={searchInputRef}
              className="oc-dropdown__search-input"
              type="text"
              value={searchQuery}
              onChange={handleSearchInput}
              placeholder="Search..."
              role="searchbox"
              aria-label="Search options"
              autoComplete="off"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                // Let arrow keys and enter bubble to the container handler
                if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape', 'Home', 'End'].includes(e.key)) {
                  // These get handled by the container's onKeyDown
                  return;
                }
              }}
            />
            {searchQuery && (
              <button
                type="button"
                className="oc-dropdown__search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
                tabIndex={-1}
              >
                <ClearIcon />
              </button>
            )}
          </div>
        )}
        <div
          className="oc-dropdown__options"
          style={{ maxHeight: searchable ? maxMenuHeight - 44 : maxMenuHeight }}
        >
          {renderMenuContent()}
          {loading && filteredOptions.length > 0 && (
            <div className="oc-dropdown__loading-more">
              <SpinnerIcon className="oc-dropdown__spinner" />
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Root render ──────────────────────────────────────────────────────

  // Reset item counter when re-rendering menu children
  useEffect(() => {
    if (isOpen && mode === 'menu') {
      itemCounterRef.current = 0;
    }
  }, [isOpen, mode]);

  // Handle focus leaving the entire dropdown tree
  const handleFocusOut = useCallback(
    (e: React.FocusEvent) => {
      if (!onBlur) return;
      // relatedTarget is the element receiving focus. If it's inside this
      // container we are just moving between trigger ↔ menu — suppress.
      if (
        containerRef.current &&
        e.relatedTarget instanceof Node &&
        containerRef.current.contains(e.relatedTarget)
      ) {
        return;
      }
      onBlur(e);
    },
    [onBlur]
  );

  const rootClasses = [
    'oc-dropdown',
    `oc-dropdown--${mode}`,
    size !== 'md' && `oc-dropdown--${size}`,
    fluid && 'oc-dropdown--fluid',
    isOpen && 'oc-dropdown--open',
    disabled && 'oc-dropdown--disabled',
    wrapDescriptions && 'oc-dropdown--wrap-descriptions',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      className={rootClasses}
      style={style}
      onKeyDown={mode === 'menu' ? handleMenuKeyDown : handleKeyDown}
      onBlur={handleFocusOut}
    >
      {renderTriggerElement()}
      {renderMenu()}
    </div>
  );
}

// ─── Export with compound components ──────────────────────────────────────

export const Dropdown = forwardRef(DropdownInner) as unknown as (<
  T extends string | number = string
>(
  props: DropdownProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement | null) & {
  displayName: string;
  Item: typeof DropdownItem;
  Divider: typeof DropdownDivider;
  Header: typeof DropdownHeader;
};

(Dropdown as any).displayName = 'Dropdown';
(Dropdown as any).Item = DropdownItem;
(Dropdown as any).Divider = DropdownDivider;
(Dropdown as any).Header = DropdownHeader;
