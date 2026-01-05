import { forwardRef, SVGAttributes, ReactNode } from 'react';
import type { GraphNodeData, Position } from '../types/relationship';

export interface GraphNodeProps extends Omit<SVGAttributes<SVGGElement>, 'onClick' | 'onDoubleClick'> {
  /** Node data */
  node: GraphNodeData & { position: Position };
  /** Whether this node is selected */
  selected?: boolean;
  /** Whether this node is the focus node */
  isFocus?: boolean;
  /** Whether this node can be expanded to show more connections */
  canExpand?: boolean;
  /** Click handler */
  onClick?: (node: GraphNodeData) => void;
  /** Double click to expand */
  onExpand?: (node: GraphNodeData) => void;
  /** Custom icon renderer */
  renderIcon?: (node: GraphNodeData) => ReactNode;
}

/**
 * GraphNode - Document node in the graph visualization.
 *
 * Displays a node circle with document title below.
 */
export const GraphNode = forwardRef<SVGGElement, GraphNodeProps>(
  (
    {
      node,
      selected = false,
      isFocus = false,
      canExpand = false,
      onClick,
      onExpand,
      renderIcon,
      className = '',
      ...props
    },
    ref
  ) => {
    const { position, title, depth = 1 } = node;
    const { x, y } = position;

    const classes = [
      'oc-graph-node',
      selected && 'oc-graph-node--selected',
      isFocus && 'oc-graph-node--focus',
      canExpand && 'oc-graph-node--expandable',
      `oc-graph-node--depth-${Math.min(depth, 2)}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Node sizes based on depth
    const nodeRadius = isFocus ? 24 : depth === 1 ? 18 : 14;
    const fontSize = isFocus ? 13 : depth === 1 ? 12 : 11;
    const maxTitleLength = isFocus ? 28 : depth === 1 ? 22 : 18;

    // Truncate title
    const displayTitle =
      title.length > maxTitleLength
        ? title.slice(0, maxTitleLength - 1) + '…'
        : title;

    return (
      <g
        ref={ref}
        className={classes}
        transform={`translate(${x}, ${y})`}
        onClick={() => onClick?.(node)}
        onDoubleClick={() => onExpand?.(node)}
        style={{ cursor: 'pointer' }}
        {...props}
      >
        {/* Selection ring */}
        {(selected || isFocus) && (
          <circle
            className="oc-graph-node__ring"
            r={nodeRadius + 4}
            fill="none"
          />
        )}

        {/* Main circle */}
        <circle
          className="oc-graph-node__circle"
          r={nodeRadius}
        />

        {/* Icon or initial */}
        {renderIcon ? (
          <foreignObject
            x={-nodeRadius / 2}
            y={-nodeRadius / 2}
            width={nodeRadius}
            height={nodeRadius}
            className="oc-graph-node__icon-wrapper"
          >
            <div className="oc-graph-node__icon">
              {renderIcon(node)}
            </div>
          </foreignObject>
        ) : (
          <text
            className="oc-graph-node__initial"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={nodeRadius * 0.6}
          >
            {title.charAt(0).toUpperCase()}
          </text>
        )}

        {/* Expand indicator */}
        {canExpand && (
          <g transform={`translate(${nodeRadius - 4}, ${-nodeRadius + 4})`}>
            <circle
              className="oc-graph-node__expand-badge"
              r={8}
            />
            <text
              className="oc-graph-node__expand-icon"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={10}
            >
              +
            </text>
          </g>
        )}

        {/* Title */}
        <text
          className="oc-graph-node__title"
          y={nodeRadius + 14}
          textAnchor="middle"
          fontSize={fontSize}
        >
          {displayTitle}
        </text>

        {/* Relationship count */}
        {node.relationshipCount !== undefined && node.relationshipCount > 0 && !isFocus && (
          <text
            className="oc-graph-node__count"
            y={nodeRadius + 14 + fontSize + 4}
            textAnchor="middle"
            fontSize={10}
          >
            {node.relationshipCount} connection{node.relationshipCount === 1 ? '' : 's'}
          </text>
        )}
      </g>
    );
  }
);

GraphNode.displayName = 'GraphNode';
