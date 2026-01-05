import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import type { DocumentRelationship, GraphDocument } from '../types/relationship';

export interface RelationshipItem {
  relationship: DocumentRelationship;
  document: GraphDocument;
  /** Direction relative to the source document */
  direction: 'incoming' | 'outgoing';
}

export interface RelationshipPopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  /** List of relationships to display */
  relationships: RelationshipItem[];
  /** Callback when a relationship is clicked */
  onRelationshipClick?: (item: RelationshipItem) => void;
  /** Callback when "View in Graph" is clicked */
  onViewInGraph?: () => void;
  /** Whether to show the "View in Graph" footer */
  showGraphLink?: boolean;
  /** Custom empty state message */
  emptyMessage?: string;
  /** Document icon renderer */
  renderIcon?: (doc: GraphDocument) => ReactNode;
  /** Maximum height before scrolling */
  maxHeight?: number;
}

/**
 * RelationshipPopoverContent - Content for relationship popover.
 *
 * Displays a list of related documents with relationship types.
 * Meant to be used with the Popover component.
 */
export const RelationshipPopoverContent = forwardRef<HTMLDivElement, RelationshipPopoverContentProps>(
  (
    {
      relationships,
      onRelationshipClick,
      onViewInGraph,
      showGraphLink = true,
      emptyMessage = 'No relationships',
      renderIcon,
      maxHeight = 280,
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-relationship-popover',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const isEmpty = relationships.length === 0;

    return (
      <div ref={ref} className={classes} {...props}>
        {/* Header */}
        <div className="oc-relationship-popover__header">
          <span className="oc-relationship-popover__title">
            {isEmpty
              ? emptyMessage
              : `${relationships.length} Related Document${relationships.length === 1 ? '' : 's'}`}
          </span>
        </div>

        {/* List */}
        {!isEmpty && (
          <div
            className="oc-relationship-popover__list"
            style={{ maxHeight }}
          >
            {relationships.map((item) => (
              <button
                key={item.relationship.id}
                type="button"
                className="oc-relationship-popover__item"
                onClick={() => onRelationshipClick?.(item)}
              >
                <span className="oc-relationship-popover__node" />
                <span className="oc-relationship-popover__connector" />
                {renderIcon && (
                  <span className="oc-relationship-popover__icon">
                    {renderIcon(item.document)}
                  </span>
                )}
                <span className="oc-relationship-popover__doc-title" title={item.document.title}>
                  {item.document.title}
                </span>
                <span className="oc-relationship-popover__rel-type">
                  {item.direction === 'incoming' ? '← ' : ''}
                  {item.relationship.label.text}
                  {item.direction === 'outgoing' ? ' →' : ''}
                </span>
                {item.relationship.source === 'analyzer' && (
                  <span className="oc-relationship-popover__ai-badge">AI</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        {showGraphLink && onViewInGraph && !isEmpty && (
          <div className="oc-relationship-popover__footer">
            <button
              type="button"
              className="oc-relationship-popover__graph-link"
              onClick={onViewInGraph}
            >
              View in Graph
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }
);

RelationshipPopoverContent.displayName = 'RelationshipPopoverContent';
