import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { Node } from '../Node';
import type { RelationshipSource } from '../types/relationship';

export interface RelationshipPillProps extends HTMLAttributes<HTMLButtonElement> {
  /** Document title */
  title: string;
  /** Relationship type label (e.g., "cites", "references") */
  relationshipType: string;
  /** Color for the relationship type (from AnnotationLabel.color) */
  relationshipColor?: string;
  /** Whether this relationship is incoming (target → source) or outgoing (source → target) */
  direction?: 'incoming' | 'outgoing';
  /** Source of the relationship */
  source?: RelationshipSource;
  /** Document type icon */
  icon?: ReactNode;
  /** Whether the pill is selected/active */
  active?: boolean;
  /** Disable interaction */
  disabled?: boolean;
}

/**
 * RelationshipPill - Compact display of a single document relationship.
 *
 * Shows node indicator, document title, and relationship type.
 * Used in popovers and lists to show related documents.
 *
 * Example: ○ NDA Template.docx — cites
 */
export const RelationshipPill = forwardRef<HTMLButtonElement, RelationshipPillProps>(
  (
    {
      title,
      relationshipType,
      relationshipColor,
      direction = 'outgoing',
      source,
      icon,
      active = false,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-relationship-pill',
      `oc-relationship-pill--${direction}`,
      active && 'oc-relationship-pill--active',
      disabled && 'oc-relationship-pill--disabled',
      source && `oc-relationship-pill--source-${source}`,
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
        {...props}
      >
        <Node
          size="xs"
          variant={active ? 'active' : 'default'}
        />
        <span className="oc-relationship-pill__connector" />
        {icon && <span className="oc-relationship-pill__icon">{icon}</span>}
        <span className="oc-relationship-pill__title" title={title}>
          {title}
        </span>
        <span
          className="oc-relationship-pill__type"
          style={relationshipColor ? { color: relationshipColor } : undefined}
        >
          {relationshipType}
        </span>
        {source === 'analyzer' && (
          <span className="oc-relationship-pill__source-badge" title="AI-detected">
            AI
          </span>
        )}
      </button>
    );
  }
);

RelationshipPill.displayName = 'RelationshipPill';
