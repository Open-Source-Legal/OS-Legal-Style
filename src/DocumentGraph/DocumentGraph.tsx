import {
  forwardRef,
  HTMLAttributes,
  useState,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import type {
  GraphNodeData,
  GraphEdgeData,
  GraphLayout,
  GraphData,
  RelationshipLabel,
  Position,
} from '../types/relationship';
import { useGraphLayout } from './useGraphLayout';
import { GraphNode } from './GraphNode';
import { GraphEdge } from './GraphEdge';
import { GraphControls } from './GraphControls';

export interface DocumentGraphProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Graph data (nodes and edges) */
  data: GraphData;
  /** Currently selected node ID */
  selectedNodeId?: string;
  /** Node selection handler */
  onNodeSelect?: (node: GraphNodeData | null) => void;
  /** Node expand handler (load more connections) */
  onNodeExpand?: (node: GraphNodeData) => void;
  /** Edge selection handler */
  onEdgeSelect?: (edge: GraphEdgeData) => void;
  /** Load more handler */
  onLoadMore?: () => void;
  /** Whether more can be loaded */
  canLoadMore?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Available relationship labels for filtering */
  relationshipLabels?: RelationshipLabel[];
  /** Active filters (label IDs) */
  activeFilters?: string[];
  /** Filter change handler */
  onFiltersChange?: (filters: string[]) => void;
  /** Custom node icon renderer */
  renderNodeIcon?: (node: GraphNodeData) => ReactNode;
  /** Initial layout */
  initialLayout?: GraphLayout;
  /** Show controls */
  showControls?: boolean;
  /** Empty state content */
  emptyState?: ReactNode;
}

/**
 * DocumentGraph - Interactive graph visualization of document relationships.
 *
 * Features:
 * - Force-directed and hierarchical layouts (toggleable)
 * - Zoom and pan
 * - Node selection and expansion
 * - Relationship filtering
 * - Progressive loading (2 hops at a time)
 */
export const DocumentGraph = forwardRef<HTMLDivElement, DocumentGraphProps>(
  (
    {
      data,
      selectedNodeId,
      onNodeSelect,
      onNodeExpand,
      onEdgeSelect,
      onLoadMore,
      canLoadMore = false,
      loading = false,
      relationshipLabels,
      activeFilters = [],
      onFiltersChange,
      renderNodeIcon,
      initialLayout = 'force',
      showControls = true,
      emptyState,
      className = '',
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState<Position>({ x: 0, y: 0 });
    const [layout, setLayout] = useState<GraphLayout>(initialLayout);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState<Position | null>(null);

    // Filter edges based on active filters
    const filteredData = useMemo(() => {
      if (activeFilters.length === 0) return data;

      const filteredEdges = data.edges.filter((edge) =>
        activeFilters.includes(edge.relationship.label.id)
      );

      // Get node IDs that are still connected
      const connectedNodeIds = new Set<string>();
      connectedNodeIds.add(data.focusNodeId || data.nodes[0]?.id || '');
      filteredEdges.forEach((edge) => {
        connectedNodeIds.add(edge.source);
        connectedNodeIds.add(edge.target);
      });

      const filteredNodes = data.nodes.filter((node) =>
        connectedNodeIds.has(node.id)
      );

      return {
        ...data,
        nodes: filteredNodes,
        edges: filteredEdges,
      };
    }, [data, activeFilters]);

    // Calculate layout
    const { nodes: positionedNodes, edges } = useGraphLayout(
      filteredData.nodes,
      filteredData.edges,
      {
        width: dimensions.width,
        height: dimensions.height,
        layout,
        focusNodeId: filteredData.focusNodeId,
      }
    );

    // Create position lookup map
    const nodePositions = useMemo(() => {
      const map = new Map<string, Position>();
      positionedNodes.forEach((node) => {
        map.set(node.id, node.position);
      });
      return map;
    }, [positionedNodes]);

    // Resize observer
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });

      observer.observe(container);
      return () => observer.disconnect();
    }, []);

    // Pan handlers
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      if (e.button !== 0) return; // Left click only
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }, [pan]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
      if (!isDragging || !dragStart) return;
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }, [isDragging, dragStart]);

    const handleMouseUp = useCallback(() => {
      setIsDragging(false);
      setDragStart(null);
    }, []);

    // Wheel zoom
    const handleWheel = useCallback((e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom((z) => Math.max(0.25, Math.min(2, z + delta)));
    }, []);

    // Background click to deselect
    const handleBackgroundClick = useCallback(() => {
      onNodeSelect?.(null);
    }, [onNodeSelect]);

    const classes = [
      'oc-document-graph',
      isDragging && 'oc-document-graph--dragging',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const isEmpty = positionedNodes.length === 0;

    return (
      <div ref={ref} className={classes} {...props}>
        <div
          ref={containerRef}
          className="oc-document-graph__canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          {isEmpty ? (
            <div className="oc-document-graph__empty">
              {emptyState || (
                <>
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                    <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  <p>No document relationships to display</p>
                </>
              )}
            </div>
          ) : (
            <svg
              ref={svgRef}
              width={dimensions.width}
              height={dimensions.height}
              className="oc-document-graph__svg"
              onClick={handleBackgroundClick}
            >
              <g
                transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
                className="oc-document-graph__content"
              >
                {/* Edges (render first, below nodes) */}
                <g className="oc-document-graph__edges">
                  {edges.map((edge) => {
                    const sourcePos = nodePositions.get(edge.source);
                    const targetPos = nodePositions.get(edge.target);
                    if (!sourcePos || !targetPos) return null;

                    const sourceNode = positionedNodes.find((n) => n.id === edge.source);
                    const targetNode = positionedNodes.find((n) => n.id === edge.target);
                    const sourceRadius =
                      sourceNode?.id === filteredData.focusNodeId
                        ? 24
                        : (sourceNode?.depth ?? 1) === 1
                        ? 18
                        : 14;
                    const targetRadius =
                      targetNode?.id === filteredData.focusNodeId
                        ? 24
                        : (targetNode?.depth ?? 1) === 1
                        ? 18
                        : 14;

                    return (
                      <GraphEdge
                        key={edge.id}
                        edge={edge}
                        sourcePosition={sourcePos}
                        targetPosition={targetPos}
                        sourceRadius={sourceRadius}
                        targetRadius={targetRadius}
                        selected={
                          selectedNodeId === edge.source ||
                          selectedNodeId === edge.target
                        }
                        muted={
                          selectedNodeId !== undefined &&
                          selectedNodeId !== edge.source &&
                          selectedNodeId !== edge.target
                        }
                        onClick={onEdgeSelect}
                      />
                    );
                  })}
                </g>

                {/* Nodes */}
                <g className="oc-document-graph__nodes">
                  {positionedNodes.map((node) => (
                    <GraphNode
                      key={node.id}
                      node={node}
                      selected={selectedNodeId === node.id}
                      isFocus={node.id === filteredData.focusNodeId}
                      canExpand={node.canExpand}
                      onClick={(n) => {
                        // Stop propagation handled in component
                        onNodeSelect?.(n);
                      }}
                      onExpand={onNodeExpand}
                      renderIcon={renderNodeIcon}
                    />
                  ))}
                </g>
              </g>
            </svg>
          )}
        </div>

        {showControls && (
          <GraphControls
            zoom={zoom}
            onZoomChange={setZoom}
            layout={layout}
            onLayoutChange={setLayout}
            relationshipLabels={relationshipLabels}
            activeFilters={activeFilters}
            onFiltersChange={onFiltersChange}
            canLoadMore={canLoadMore}
            onLoadMore={onLoadMore}
            loading={loading}
          />
        )}
      </div>
    );
  }
);

DocumentGraph.displayName = 'DocumentGraph';
