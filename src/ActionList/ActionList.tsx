import React, { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode, ButtonHTMLAttributes } from 'react';

export interface ActionItemData {
  /** Unique identifier */
  id: string | number;
  /** Item label */
  label: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Optional description */
  description?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Link URL (renders as anchor) */
  href?: string;
}

export interface ActionItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Item label */
  label?: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Optional description */
  description?: string;
  /** Link URL (renders as anchor) */
  href?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class name */
  className?: string;
  children?: ReactNode;
}

export interface ActionListProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of action items */
  items?: ActionItemData[];
  /** Called when an item is clicked */
  onItemClick?: (item: ActionItemData) => void;
  /** Size variant for items */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'card';
  /** Additional class name */
  className?: string;
  children?: ReactNode;
}

export const ActionItem = forwardRef<HTMLButtonElement, ActionItemProps>(
  (
    {
      label,
      icon,
      description,
      href,
      size = 'md',
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-action-item',
      `oc-action-item--${size}`,
      disabled && 'oc-action-item--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {icon && <span className="oc-action-item__icon">{icon}</span>}
        <span className="oc-action-item__content">
          <span className="oc-action-item__label">{label || children}</span>
          {description && (
            <span className="oc-action-item__description">{description}</span>
          )}
        </span>
      </>
    );

    if (href && !disabled) {
      return (
        <a href={href} className={classes}>
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

ActionItem.displayName = 'ActionItem';

export const ActionList = forwardRef<HTMLDivElement, ActionListProps>(
  (
    {
      items,
      onItemClick,
      size = 'md',
      variant = 'default',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-action-list',
      `oc-action-list--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="list" {...props}>
        {items
          ? items.map((item) => (
              <ActionItem
                key={item.id}
                label={item.label}
                icon={item.icon}
                description={item.description}
                href={item.href}
                size={size}
                disabled={item.disabled}
                onClick={() => onItemClick?.(item)}
                role="listitem"
              />
            ))
          : children}
      </div>
    );
  }
);

ActionList.displayName = 'ActionList';
