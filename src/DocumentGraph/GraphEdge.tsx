import { forwardRef, SVGAttributes } from 'react';
import type { GraphEdgeData, GraphNodeData, Position } from '../types/relationship';

export interface GraphEdgeProps extends Omit<SVGAttributes<SVGGElement>, 'onClick'> {
  /** Edge data */
  edge: GraphEdgeData;
  /** Source node position */
  sourcePosition: Position;
  /** Target node position */
  targetPosition: Position;
  /** Source node radius (for path calculation) */
  sourceRadius?: number;
  /** Target node radius (for path calculation) */
  targetRadius?: number;
  /** Whether this edge is selected/highlighted */
  selected?: boolean;
  /** Whether this edge is muted (not related to selection) */
  muted?: boolean;
  /** Show label */
  showLabel?: boolean;
  /** Click handler */
  onClick?: (edge: GraphEdgeData) => void;
}

/**
 * GraphEdge - Relationship edge between nodes in the graph.
 */
export const GraphEdge = forwardRef<SVGGElement, GraphEdgeProps>(
  (
    {
      edge,
      sourcePosition,
      targetPosition,
      sourceRadius = 18,
      targetRadius = 18,
      selected = false,
      muted = false,
      showLabel = false,
      onClick,
      className = '',
      ...props
    },
    ref
  ) => {
    const { relationship } = edge;

    const classes = [
      'oc-graph-edge',
      selected && 'oc-graph-edge--selected',
      muted && 'oc-graph-edge--muted',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Calculate edge start/end points (accounting for node radius)
    const dx = targetPosition.x - sourcePosition.x;
    const dy = targetPosition.y - sourcePosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return null;

    // Normalize direction
    const nx = dx / distance;
    const ny = dy / distance;

    // Calculate actual start/end points
    const x1 = sourcePosition.x + nx * (sourceRadius + 2);
    const y1 = sourcePosition.y + ny * (sourceRadius + 2);
    const x2 = targetPosition.x - nx * (targetRadius + 8); // Extra for arrow
    const y2 = targetPosition.y - ny * (targetRadius + 8);

    // Midpoint for label
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    // Determine edge style based on relationship source
    const isAiDetected = relationship.source === 'analyzer';
    const dashArray = isAiDetected ? '4 3' : undefined;

    // Arrow marker ID
    const markerId = `arrow-${edge.id}`;

    return (
      <g
        ref={ref}
        className={classes}
        onClick={() => onClick?.(edge)}
        style={{ cursor: onClick ? 'pointer' : undefined }}
        {...props}
      >
        {/* Arrow marker */}
        <defs>
          <marker
            id={markerId}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path
              d="M 0 0 L 8 4 L 0 8 Z"
              className="oc-graph-edge__arrow"
              style={relationship.label.color ? { fill: relationship.label.color } : undefined}
            />
          </marker>
        </defs>

        {/* Edge line */}
        <path
          d={`M ${x1} ${y1} L ${x2} ${y2}`}
          className="oc-graph-edge__line"
          strokeDasharray={dashArray}
          style={relationship.label.color ? { stroke: relationship.label.color } : undefined}
          markerEnd={`url(#${markerId})`}
        />

        {/* Label (shown on hover or when selected) */}
        {(showLabel || selected) && (
          <g className="oc-graph-edge__label-group">
            <rect
              x={midX - relationship.label.text.length * 3.5 - 6}
              y={midY - 10}
              width={relationship.label.text.length * 7 + 12}
              height={20}
              rx={4}
              className="oc-graph-edge__label-bg"
            />
            <text
              x={midX}
              y={midY}
              className="oc-graph-edge__label"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {relationship.label.text}
            </text>
            {isAiDetected && (
              <>
                <rect
                  x={midX + relationship.label.text.length * 3.5 + 2}
                  y={midY - 6}
                  width={16}
                  height={12}
                  rx={2}
                  className="oc-graph-edge__ai-badge-bg"
                />
                <text
                  x={midX + relationship.label.text.length * 3.5 + 10}
                  y={midY}
                  className="oc-graph-edge__ai-badge"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={8}
                >
                  AI
                </text>
              </>
            )}
          </g>
        )}
      </g>
    );
  }
);

GraphEdge.displayName = 'GraphEdge';
