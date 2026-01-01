import React, { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface FilterTabItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional count badge */
  count?: string | number;
  /** Optional icon */
  icon?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

export interface FilterTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Array of tab items */
  items: FilterTabItem[];
  /** Currently active tab id */
  value?: string;
  /** Called when tab changes */
  onChange?: (id: string) => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'pill' | 'underline';
  /** Show filter icon before tabs */
  showIcon?: boolean;
  /** Called when filter icon is clicked */
  onIconClick?: (e: React.MouseEvent) => void;
  /** Additional class name */
  className?: string;
}

const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
    <path d="M1.5 2.25A.75.75 0 012.25 1.5h13.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.22.53L11.25 9.56v5.19a.75.75 0 01-.39.66l-3 1.5a.75.75 0 01-1.11-.66V9.56L1.72 5.03a.75.75 0 01-.22-.53V2.25z" />
  </svg>
);

export interface FilterTabProps extends HTMLAttributes<HTMLButtonElement> {
  /** Whether this tab is active */
  active?: boolean;
  /** Count badge */
  count?: string | number;
  /** Optional icon */
  icon?: ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'pill' | 'underline';
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
  children: ReactNode;
}

export const FilterTab = forwardRef<HTMLButtonElement, FilterTabProps>(
  (
    {
      active = false,
      count,
      icon,
      size = 'md',
      variant = 'pill',
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-filter-tab',
      `oc-filter-tab--${size}`,
      `oc-filter-tab--${variant}`,
      active && 'oc-filter-tab--active',
      disabled && 'oc-filter-tab--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        disabled={disabled}
        aria-pressed={active}
        {...props}
      >
        {icon && <span className="oc-filter-tab__icon">{icon}</span>}
        <span className="oc-filter-tab__label">{children}</span>
        {count !== undefined && (
          <span className="oc-filter-tab__count">{count}</span>
        )}
      </button>
    );
  }
);

FilterTab.displayName = 'FilterTab';

export const FilterTabs = forwardRef<HTMLDivElement, FilterTabsProps>(
  (
    {
      items,
      value,
      onChange,
      size = 'md',
      variant = 'pill',
      showIcon = false,
      onIconClick,
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-filter-tabs',
      `oc-filter-tabs--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="tablist" {...props}>
        {showIcon && (
          <button
            type="button"
            className="oc-filter-tabs__icon-button"
            onClick={onIconClick}
            aria-label="Filter options"
          >
            <FilterIcon />
          </button>
        )}
        {items.map((item) => (
          <FilterTab
            key={item.id}
            active={value === item.id}
            count={item.count}
            icon={item.icon}
            size={size}
            variant={variant}
            disabled={item.disabled}
            onClick={() => onChange?.(item.id)}
            role="tab"
            aria-selected={value === item.id}
          >
            {item.label}
          </FilterTab>
        ))}
      </div>
    );
  }
);

FilterTabs.displayName = 'FilterTabs';
