import { forwardRef, HTMLAttributes } from 'react';

export type NodeSize = 'xs' | 'sm' | 'md' | 'lg';
export type NodeVariant = 'default' | 'active' | 'muted' | 'connected';

export interface NodeProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of the node */
  size?: NodeSize;
  /** Visual variant */
  variant?: NodeVariant;
  /** Show pulse animation */
  pulse?: boolean;
  /** Badge count (shown for sm and larger) */
  count?: number;
  /** Whether the node is interactive */
  interactive?: boolean;
}

/**
 * Node - Signature visual element for OpenContracts.
 *
 * Small teal circles echoing the logo's highlighted vertices.
 * Used to visualize connections and relationships in the legal document UI.
 */
export const Node = forwardRef<HTMLDivElement, NodeProps>(
  (
    {
      size = 'sm',
      variant = 'default',
      pulse = false,
      count,
      interactive = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-node',
      `oc-node--${size}`,
      `oc-node--${variant}`,
      pulse && 'oc-node--pulse',
      interactive && 'oc-node--interactive',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const showCount = count !== undefined && count > 0 && size !== 'xs';

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="oc-node__circle" />
        {showCount && (
          <span className="oc-node__count">{count > 99 ? '99+' : count}</span>
        )}
      </div>
    );
  }
);

Node.displayName = 'Node';
