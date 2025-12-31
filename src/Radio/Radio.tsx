import React, { forwardRef, InputHTMLAttributes, createContext, useContext, useId, ReactNode } from 'react';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  error?: boolean;
}

export interface RadioGroupProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children?: ReactNode;
}

interface RadioGroupContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error = false, disabled, className = '', id, value, ...props }, ref) => {
    const generatedId = useId();
    const radioId = id || generatedId;
    const groupContext = useContext(RadioGroupContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (groupContext && value) {
        groupContext.onChange(value as string);
      }
      props.onChange?.(e);
    };

    const isChecked = groupContext
      ? groupContext.value === value
      : props.checked;

    const wrapperClasses = [
      'oc-radio-wrapper',
      disabled && 'oc-radio-wrapper--disabled',
      error && 'oc-radio-wrapper--error',
      className,
    ].filter(Boolean).join(' ');

    const circleClasses = [
      'oc-radio-circle',
      isChecked && 'oc-radio-circle--checked',
    ].filter(Boolean).join(' ');

    return (
      <label className={wrapperClasses} htmlFor={radioId}>
        <span className={circleClasses}>
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className="oc-radio-input"
            disabled={disabled}
            checked={isChecked}
            value={value}
            name={groupContext?.name}
            onChange={handleChange}
            {...props}
          />
          {isChecked && <span className="oc-radio-dot" />}
        </span>
        {label && <span className="oc-radio-label">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      value,
      defaultValue = '',
      onChange,
      orientation = 'vertical',
      className = '',
      children,
    },
    ref
  ) => {
    const generatedName = useId();
    const groupName = name || generatedName;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (newValue: string) => {
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const classes = [
      'oc-radio-group',
      `oc-radio-group--${orientation}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <RadioGroupContext.Provider value={{ name: groupName, value: currentValue, onChange: handleChange }}>
        <div ref={ref} className={classes} role="radiogroup">
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
