import React, { forwardRef, InputHTMLAttributes, createContext, useContext, useId, ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  indeterminate?: boolean;
  error?: boolean;
}

export interface CheckboxGroupProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children?: ReactNode;
}

interface CheckboxGroupContextValue {
  value: string[];
  onChange: (itemValue: string, checked: boolean) => void;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, indeterminate = false, error = false, disabled, className = '', id, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const groupContext = useContext(CheckboxGroupContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (groupContext && props.value) {
        groupContext.onChange(props.value as string, e.target.checked);
      }
      props.onChange?.(e);
    };

    const isChecked = groupContext && props.value
      ? groupContext.value.includes(props.value as string)
      : props.checked;

    const wrapperClasses = [
      'oc-checkbox-wrapper',
      disabled && 'oc-checkbox-wrapper--disabled',
      error && 'oc-checkbox-wrapper--error',
      className,
    ].filter(Boolean).join(' ');

    const boxClasses = [
      'oc-checkbox-box',
      isChecked && 'oc-checkbox-box--checked',
      indeterminate && 'oc-checkbox-box--indeterminate',
    ].filter(Boolean).join(' ');

    return (
      <label className={wrapperClasses} htmlFor={checkboxId}>
        <span className={boxClasses}>
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="oc-checkbox-input"
            disabled={disabled}
            checked={isChecked}
            onChange={handleChange}
            {...props}
          />
          {isChecked && !indeterminate && (
            <svg className="oc-checkbox-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
          {indeterminate && (
            <svg className="oc-checkbox-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12h14" />
            </svg>
          )}
        </span>
        {label && <span className="oc-checkbox-label">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      value,
      defaultValue = [],
      onChange,
      orientation = 'vertical',
      className = '',
      children,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (itemValue: string, checked: boolean) => {
      const newValue = checked
        ? [...currentValue, itemValue]
        : currentValue.filter(v => v !== itemValue);
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const classes = [
      'oc-checkbox-group',
      `oc-checkbox-group--${orientation}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <CheckboxGroupContext.Provider value={{ value: currentValue, onChange: handleChange }}>
        <div ref={ref} className={classes} role="group">
          {children}
        </div>
      </CheckboxGroupContext.Provider>
    );
  }
);

CheckboxGroup.displayName = 'CheckboxGroup';
