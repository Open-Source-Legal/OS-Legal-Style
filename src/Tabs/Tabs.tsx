import React, { forwardRef, createContext, useContext, useState, ReactNode, HTMLAttributes, KeyboardEvent, useRef } from 'react';

export type TabsVariant = 'line' | 'enclosed' | 'pills';
export type TabsOrientation = 'horizontal' | 'vertical';

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: TabsVariant;
  orientation?: TabsOrientation;
  children?: ReactNode;
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}

export interface TabPanelsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: ReactNode;
}

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  variant: TabsVariant;
  orientation: TabsOrientation;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tab components must be used within a Tabs component');
  }
  return context;
};

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value,
      defaultValue = '',
      onChange,
      variant = 'line',
      orientation = 'horizontal',
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

    const classes = [
      'oc-tabs',
      `oc-tabs--${variant}`,
      `oc-tabs--${orientation}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <TabsContext.Provider value={{ value: currentValue, onChange: handleChange, variant, orientation }}>
        <div ref={ref} className={classes} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className = '', children, ...props }, ref) => {
    const { orientation } = useTabsContext();
    const tabListRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: KeyboardEvent) => {
      const tabs = tabListRef.current?.querySelectorAll('[role="tab"]:not([disabled])');
      if (!tabs) return;

      const tabArray = Array.from(tabs) as HTMLButtonElement[];
      const currentIndex = tabArray.findIndex(tab => tab === document.activeElement);

      let nextIndex: number | null = null;

      if (orientation === 'horizontal') {
        if (e.key === 'ArrowRight') {
          nextIndex = currentIndex < tabArray.length - 1 ? currentIndex + 1 : 0;
        } else if (e.key === 'ArrowLeft') {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : tabArray.length - 1;
        }
      } else {
        if (e.key === 'ArrowDown') {
          nextIndex = currentIndex < tabArray.length - 1 ? currentIndex + 1 : 0;
        } else if (e.key === 'ArrowUp') {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : tabArray.length - 1;
        }
      }

      if (e.key === 'Home') {
        nextIndex = 0;
      } else if (e.key === 'End') {
        nextIndex = tabArray.length - 1;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        tabArray[nextIndex].focus();
        tabArray[nextIndex].click();
      }
    };

    const classes = ['oc-tab-list', className].filter(Boolean).join(' ');

    return (
      <div
        ref={(node) => {
          (tabListRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={classes}
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabList.displayName = 'TabList';

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ value, disabled = false, icon, className = '', children, ...props }, ref) => {
    const { value: selectedValue, onChange, variant } = useTabsContext();
    const isSelected = selectedValue === value;

    const classes = [
      'oc-tab',
      isSelected && 'oc-tab--selected',
      disabled && 'oc-tab--disabled',
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        role="tab"
        type="button"
        aria-selected={isSelected}
        aria-controls={`tabpanel-${value}`}
        id={`tab-${value}`}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        onClick={() => !disabled && onChange(value)}
        {...props}
      >
        {icon && <span className="oc-tab__icon">{icon}</span>}
        {children}
      </button>
    );
  }
);

Tab.displayName = 'Tab';

export const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-tab-panels', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

TabPanels.displayName = 'TabPanels';

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, className = '', children, ...props }, ref) => {
    const { value: selectedValue } = useTabsContext();
    const isSelected = selectedValue === value;

    if (!isSelected) return null;

    const classes = ['oc-tab-panel', className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        tabIndex={0}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel';
