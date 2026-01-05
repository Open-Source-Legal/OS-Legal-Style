import { forwardRef, SVGAttributes } from 'react';

export type EdgeVariant = 'solid' | 'dashed' | 'dotted';

export interface EdgeProps extends Omit<SVGAttributes<SVGGElement>, 'color'> {
  /** Start point */
  x1: number;
  y1: number;
  /** End point */
  x2: number;
  y2: number;
  /** Edge style variant */
  variant?: EdgeVariant;
  /** Edge color (CSS color value) */
  color?: string;
  /** Show arrow at end */
  arrow?: boolean;
  /** Edge label text */
  label?: string;
  /** Whether edge is highlighted/active */
  active?: boolean;
  /** Whether edge is muted */
  muted?: boolean;
  /** Animate the edge (for emphasis) */
  animated?: boolean;
  /** Curve amount (0 = straight, positive = curve) */
  curve?: number;
}

/**
 * Edge - SVG connection line between nodes.
 *
 * Used in graph visualizations to show relationships between documents.
 */
export const Edge = forwardRef<SVGGElement, EdgeProps>(
  (
    {
      x1,
      y1,
      x2,
      y2,
      variant = 'solid',
      color,
      arrow = false,
      label,
      active = false,
      muted = false,
      animated = false,
      curve = 0,
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-edge',
      `oc-edge--${variant}`,
      active && 'oc-edge--active',
      muted && 'oc-edge--muted',
      animated && 'oc-edge--animated',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Calculate path
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    // For curved edges, calculate control point perpendicular to line
    let path: string;
    let labelX = midX;
    let labelY = midY;

    if (curve !== 0) {
      // Calculate perpendicular offset for curve
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = -dy / len; // Normal x
      const ny = dx / len; // Normal y
      const cx = midX + nx * curve;
      const cy = midY + ny * curve;
      path = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
      // Adjust label position for curve
      labelX = cx;
      labelY = cy;
    } else {
      path = `M ${x1} ${y1} L ${x2} ${y2}`;
    }

    // Arrow marker ID (unique per color to avoid conflicts)
    const arrowId = color
      ? `oc-edge-arrow-${color.replace(/[^a-zA-Z0-9]/g, '')}`
      : 'oc-edge-arrow';

    return (
      <g ref={ref} className={classes} {...props}>
        {/* Arrow marker definition */}
        {arrow && (
          <defs>
            <marker
              id={arrowId}
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path
                d="M 0 0 L 8 4 L 0 8 Z"
                className="oc-edge__arrow"
                style={color ? { fill: color } : undefined}
              />
            </marker>
          </defs>
        )}

        {/* Main edge path */}
        <path
          d={path}
          className="oc-edge__line"
          style={color ? { stroke: color } : undefined}
          markerEnd={arrow ? `url(#${arrowId})` : undefined}
        />

        {/* Label */}
        {label && (
          <g className="oc-edge__label-group">
            <rect
              x={labelX - label.length * 3.5 - 4}
              y={labelY - 8}
              width={label.length * 7 + 8}
              height={16}
              rx={4}
              className="oc-edge__label-bg"
            />
            <text
              x={labelX}
              y={labelY}
              className="oc-edge__label"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {label}
            </text>
          </g>
        )}
      </g>
    );
  }
);

Edge.displayName = 'Edge';
