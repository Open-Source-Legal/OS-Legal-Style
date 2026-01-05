import { forwardRef, HTMLAttributes } from 'react';
import { Node } from '../Node';

export interface RelationshipBadgeProps extends HTMLAttributes<HTMLButtonElement> {
  /** Number of relationships */
  count: number;
  /** Whether the badge is active/expanded */
  active?: boolean;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Disable interaction */
  disabled?: boolean;
}

/**
 * RelationshipBadge - Compact indicator showing relationship count.
 *
 * Shows a small node with connecting line and count.
 * Used in file browsers to indicate documents have relationships.
 *
 * Example: ○─3
 */
export const RelationshipBadge = forwardRef<HTMLButtonElement, RelationshipBadgeProps>(
  (
    {
      count,
      active = false,
      size = 'sm',
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    if (count <= 0) return null;

    const classes = [
      'oc-relationship-badge',
      `oc-relationship-badge--${size}`,
      active && 'oc-relationship-badge--active',
      disabled && 'oc-relationship-badge--disabled',
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
        aria-label={`${count} relationship${count === 1 ? '' : 's'}`}
        {...props}
      >
        <Node
          size={size === 'sm' ? 'xs' : 'sm'}
          variant={active ? 'active' : 'muted'}
          interactive={!disabled}
        />
        <span className="oc-relationship-badge__connector" />
        <span className="oc-relationship-badge__count">
          {count > 99 ? '99+' : count}
        </span>
      </button>
    );
  }
);

RelationshipBadge.displayName = 'RelationshipBadge';
