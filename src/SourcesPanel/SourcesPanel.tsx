import React, { forwardRef, ReactNode, HTMLAttributes, useState } from 'react';

// ============ SourcesPanel Container ============

export interface SourcesPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Active tab value */
  activeTab?: string;
  /** Tab change handler */
  onTabChange?: (value: string) => void;
  /** Default active tab */
  defaultTab?: string;
  /** Children content */
  children: ReactNode;
}

export const SourcesPanel = forwardRef<HTMLDivElement, SourcesPanelProps>(
  (
    {
      activeTab,
      onTabChange,
      defaultTab = 'files',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-sources-panel',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

SourcesPanel.displayName = 'SourcesPanel';

// ============ Panel Tab Group ============

export interface PanelTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Active tab value */
  value?: string;
  /** Tab change handler */
  onChange?: (value: string) => void;
  /** Default value */
  defaultValue?: string;
  /** Children (PanelTab components) */
  children: ReactNode;
}

interface PanelTabsContextValue {
  value: string;
  onChange: (value: string) => void;
}

const PanelTabsContext = React.createContext<PanelTabsContextValue | null>(null);

export const PanelTabs = forwardRef<HTMLDivElement, PanelTabsProps>(
  (
    {
      value,
      onChange,
      defaultValue = '',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (newValue: string) => {
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const classes = ['oc-panel-tabs', className].filter(Boolean).join(' ');

    return (
      <PanelTabsContext.Provider value={{ value: currentValue, onChange: handleChange }}>
        <div ref={ref} className={classes} role="tablist" {...props}>
          {children}
        </div>
      </PanelTabsContext.Provider>
    );
  }
);

PanelTabs.displayName = 'PanelTabs';

// ============ Panel Tab ============

export interface PanelTabProps extends HTMLAttributes<HTMLButtonElement> {
  /** Tab value */
  value: string;
  /** Icon */
  icon?: ReactNode;
  /** Tab label */
  children: ReactNode;
}

export const PanelTab = forwardRef<HTMLButtonElement, PanelTabProps>(
  ({ value, icon, className = '', children, ...props }, ref) => {
    const context = React.useContext(PanelTabsContext);
    if (!context) {
      throw new Error('PanelTab must be used within PanelTabs');
    }

    const isSelected = context.value === value;
    const classes = [
      'oc-panel-tab',
      isSelected && 'oc-panel-tab--selected',
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        role="tab"
        type="button"
        aria-selected={isSelected}
        onClick={() => context.onChange(value)}
        {...props}
      >
        {icon && <span className="oc-panel-tab__icon">{icon}</span>}
        <span className="oc-panel-tab__label">{children}</span>
      </button>
    );
  }
);

PanelTab.displayName = 'PanelTab';

// ============ Panel Search ============

export interface PanelSearchProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Search value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
}

export const PanelSearch = forwardRef<HTMLInputElement, PanelSearchProps>(
  (
    {
      value = '',
      onChange,
      placeholder = 'Search...',
      className = '',
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value);
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const classes = ['oc-panel-search', className].filter(Boolean).join(' ');

    return (
      <div className={classes} {...props}>
        <svg
          className="oc-panel-search__icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M9.965 11.026a5 5 0 111.06-1.06l2.755 2.754a.75.75 0 11-1.06 1.06l-2.755-2.754zM10.5 7a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" clipRule="evenodd" />
        </svg>
        <input
          ref={ref}
          type="text"
          className="oc-panel-search__input"
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

PanelSearch.displayName = 'PanelSearch';

// ============ Panel Action List ============

export interface PanelActionListProps extends HTMLAttributes<HTMLDivElement> {
  /** Children (PanelAction components) */
  children: ReactNode;
}

export const PanelActionList = forwardRef<HTMLDivElement, PanelActionListProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-panel-action-list', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

PanelActionList.displayName = 'PanelActionList';

// ============ Panel Action ============

export interface PanelActionProps extends HTMLAttributes<HTMLButtonElement> {
  /** Icon */
  icon?: ReactNode;
  /** Label text */
  label: string;
  /** Description text */
  description?: string;
  /** Click handler */
  onClick?: () => void;
  /** Is disabled */
  disabled?: boolean;
}

export const PanelAction = forwardRef<HTMLButtonElement, PanelActionProps>(
  (
    {
      icon,
      label,
      description,
      disabled = false,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-panel-action',
      disabled && 'oc-panel-action--disabled',
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        type="button"
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {icon && <span className="oc-panel-action__icon">{icon}</span>}
        <span className="oc-panel-action__content">
          <span className="oc-panel-action__label">{label}</span>
          {description && (
            <span className="oc-panel-action__desc">{description}</span>
          )}
        </span>
      </button>
    );
  }
);

PanelAction.displayName = 'PanelAction';

// ============ Panel Section ============

export interface PanelSectionProps extends HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title?: string;
  /** Children content */
  children: ReactNode;
}

export const PanelSection = forwardRef<HTMLDivElement, PanelSectionProps>(
  ({ title, className = '', children, ...props }, ref) => {
    const classes = ['oc-panel-section', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {title && <h3 className="oc-panel-section__title">{title}</h3>}
        <div className="oc-panel-section__content">{children}</div>
      </div>
    );
  }
);

PanelSection.displayName = 'PanelSection';

// ============ Common Icons ============

export const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

export const FilesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
  </svg>
);

export const PromptsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);

export const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

export const IntegrationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
  </svg>
);
