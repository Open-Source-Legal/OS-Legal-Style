import React, { forwardRef, ReactNode, ButtonHTMLAttributes } from 'react';

export type ChipVariant = 'filled' | 'outlined' | 'soft';
export type ChipSize = 'sm' | 'md' | 'lg';
export type ChipColor = 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: ChipVariant;
  /** Size */
  size?: ChipSize;
  /** Color scheme */
  color?: ChipColor;
  /** Icon before label */
  icon?: ReactNode;
  /** Icon after label */
  endIcon?: ReactNode;
  /** Selected/active state */
  selected?: boolean;
  /** Removable with X button */
  removable?: boolean;
  /** Remove callback */
  onRemove?: () => void;
  /** Render as non-interactive element */
  static?: boolean;
  children: ReactNode;
}

export interface ChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap between chips */
  gap?: 'sm' | 'md';
  children: ReactNode;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      variant = 'soft',
      size = 'md',
      color = 'default',
      icon,
      endIcon,
      selected = false,
      removable = false,
      onRemove,
      static: isStatic = false,
      className = '',
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-chip',
      `oc-chip--${variant}`,
      `oc-chip--${size}`,
      `oc-chip--${color}`,
      selected && 'oc-chip--selected',
      isStatic && 'oc-chip--static',
      className,
    ].filter(Boolean).join(' ');

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.();
    };

    const Component = isStatic ? 'span' : 'button';

    return (
      <Component
        ref={ref as any}
        className={classes}
        onClick={isStatic ? undefined : onClick}
        type={isStatic ? undefined : 'button'}
        {...(props as any)}
      >
        {icon && <span className="oc-chip__icon">{icon}</span>}
        <span className="oc-chip__label">{children}</span>
        {endIcon && <span className="oc-chip__icon oc-chip__icon--end">{endIcon}</span>}
        {removable && (
          <button
            type="button"
            className="oc-chip__remove"
            onClick={handleRemove}
            aria-label="Remove"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M4.293 4.293a1 1 0 011.414 0L7 5.586l1.293-1.293a1 1 0 111.414 1.414L8.414 7l1.293 1.293a1 1 0 01-1.414 1.414L7 8.414l-1.293 1.293a1 1 0 01-1.414-1.414L5.586 7 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
          </button>
        )}
      </Component>
    );
  }
);

Chip.displayName = 'Chip';

export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(
  ({ gap = 'sm', className = '', children, ...props }, ref) => {
    const classes = [
      'oc-chip-group',
      `oc-chip-group--gap-${gap}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} role="group" {...props}>
        {children}
      </div>
    );
  }
);

ChipGroup.displayName = 'ChipGroup';

/** Suggestion chip for prompts */
export interface SuggestionChipProps extends Omit<ChipProps, 'variant' | 'color'> {
  /** Prompt icon */
  promptIcon?: boolean;
}

export const SuggestionChip = forwardRef<HTMLButtonElement, SuggestionChipProps>(
  ({ promptIcon = true, icon, children, ...props }, ref) => (
    <Chip
      ref={ref}
      variant="outlined"
      color="default"
      icon={
        promptIcon && !icon ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" opacity="0.5">
            <path d="M7 1a6 6 0 100 12A6 6 0 007 1zM0 7a7 7 0 1114 0A7 7 0 010 7z" />
            <path d="M7.5 4.5a.5.5 0 00-1 0v2h-2a.5.5 0 000 1h2v2a.5.5 0 001 0v-2h2a.5.5 0 000-1h-2v-2z" />
          </svg>
        ) : icon
      }
      {...props}
    >
      {children}
    </Chip>
  )
);

SuggestionChip.displayName = 'SuggestionChip';

/** Filter chip with toggle behavior */
export interface FilterChipProps extends Omit<ChipProps, 'variant'> {
  /** Checked state */
  checked?: boolean;
  /** Change handler */
  onCheckedChange?: (checked: boolean) => void;
}

export const FilterChip = forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ checked = false, onCheckedChange, onClick, icon, children, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onCheckedChange?.(!checked);
      onClick?.(e);
    };

    return (
      <Chip
        ref={ref}
        variant={checked ? 'filled' : 'outlined'}
        color={checked ? 'accent' : 'default'}
        selected={checked}
        onClick={handleClick}
        icon={
          checked ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M11.354 4.354a.5.5 0 00-.708-.708L5.5 8.793 3.354 6.646a.5.5 0 10-.708.708l2.5 2.5a.5.5 0 00.708 0l5.5-5.5z" />
            </svg>
          ) : icon
        }
        {...props}
      >
        {children}
      </Chip>
    );
  }
);

FilterChip.displayName = 'FilterChip';
