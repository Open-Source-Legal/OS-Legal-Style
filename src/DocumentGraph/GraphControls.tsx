import { forwardRef, HTMLAttributes } from 'react';
import type { GraphLayout, RelationshipLabel } from '../types/relationship';

export interface GraphControlsProps extends HTMLAttributes<HTMLDivElement> {
  /** Current zoom level (1 = 100%) */
  zoom: number;
  /** Zoom change handler */
  onZoomChange: (zoom: number) => void;
  /** Current layout mode */
  layout: GraphLayout;
  /** Layout change handler */
  onLayoutChange: (layout: GraphLayout) => void;
  /** Available relationship labels for filtering */
  relationshipLabels?: RelationshipLabel[];
  /** Currently active label filters (empty = all) */
  activeFilters?: string[];
  /** Filter change handler */
  onFiltersChange?: (filters: string[]) => void;
  /** Whether more nodes can be loaded */
  canLoadMore?: boolean;
  /** Load more handler */
  onLoadMore?: () => void;
  /** Whether loading is in progress */
  loading?: boolean;
  /** Min zoom level */
  minZoom?: number;
  /** Max zoom level */
  maxZoom?: number;
}

/**
 * GraphControls - Control panel for document graph.
 *
 * Provides zoom, layout toggle, filters, and load more functionality.
 */
export const GraphControls = forwardRef<HTMLDivElement, GraphControlsProps>(
  (
    {
      zoom,
      onZoomChange,
      layout,
      onLayoutChange,
      relationshipLabels,
      activeFilters = [],
      onFiltersChange,
      canLoadMore = false,
      onLoadMore,
      loading = false,
      minZoom = 0.25,
      maxZoom = 2,
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = ['oc-graph-controls', className].filter(Boolean).join(' ');

    const handleZoomIn = () => {
      onZoomChange(Math.min(zoom + 0.25, maxZoom));
    };

    const handleZoomOut = () => {
      onZoomChange(Math.max(zoom - 0.25, minZoom));
    };

    const handleZoomReset = () => {
      onZoomChange(1);
    };

    const toggleLayout = () => {
      onLayoutChange(layout === 'force' ? 'hierarchical' : 'force');
    };

    const toggleFilter = (labelId: string) => {
      if (!onFiltersChange) return;

      if (activeFilters.includes(labelId)) {
        onFiltersChange(activeFilters.filter((id) => id !== labelId));
      } else {
        onFiltersChange([...activeFilters, labelId]);
      }
    };

    return (
      <div ref={ref} className={classes} {...props}>
        {/* Zoom controls */}
        <div className="oc-graph-controls__group">
          <button
            type="button"
            className="oc-graph-controls__button"
            onClick={handleZoomOut}
            disabled={zoom <= minZoom}
            title="Zoom out"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35M8 11h6" />
            </svg>
          </button>
          <button
            type="button"
            className="oc-graph-controls__button oc-graph-controls__button--text"
            onClick={handleZoomReset}
            title="Reset zoom"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            className="oc-graph-controls__button"
            onClick={handleZoomIn}
            disabled={zoom >= maxZoom}
            title="Zoom in"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
            </svg>
          </button>
        </div>

        {/* Layout toggle */}
        <div className="oc-graph-controls__group">
          <button
            type="button"
            className={`oc-graph-controls__button ${layout === 'force' ? 'oc-graph-controls__button--active' : ''}`}
            onClick={() => onLayoutChange('force')}
            title="Radial layout"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="4" r="2" />
              <circle cx="20" cy="12" r="2" />
              <circle cx="12" cy="20" r="2" />
              <circle cx="4" cy="12" r="2" />
              <path d="M12 7v2M17 12h-2M12 15v2M9 12H7" />
            </svg>
          </button>
          <button
            type="button"
            className={`oc-graph-controls__button ${layout === 'hierarchical' ? 'oc-graph-controls__button--active' : ''}`}
            onClick={() => onLayoutChange('hierarchical')}
            title="Hierarchical layout"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="2" width="6" height="4" rx="1" />
              <rect x="2" y="18" width="6" height="4" rx="1" />
              <rect x="16" y="18" width="6" height="4" rx="1" />
              <path d="M12 6v4M12 10h-7v8M12 10h7v8" />
            </svg>
          </button>
        </div>

        {/* Relationship filters */}
        {relationshipLabels && relationshipLabels.length > 0 && onFiltersChange && (
          <div className="oc-graph-controls__group oc-graph-controls__filters">
            {relationshipLabels.map((label) => (
              <button
                key={label.id}
                type="button"
                className={`oc-graph-controls__filter ${
                  activeFilters.length === 0 || activeFilters.includes(label.id)
                    ? 'oc-graph-controls__filter--active'
                    : ''
                }`}
                onClick={() => toggleFilter(label.id)}
                style={{
                  '--filter-color': label.color,
                } as React.CSSProperties}
                title={label.description || label.text}
              >
                <span
                  className="oc-graph-controls__filter-dot"
                  style={{ backgroundColor: label.color }}
                />
                {label.text}
              </button>
            ))}
          </div>
        )}

        {/* Load more */}
        {canLoadMore && onLoadMore && (
          <div className="oc-graph-controls__group">
            <button
              type="button"
              className="oc-graph-controls__button oc-graph-controls__load-more"
              onClick={onLoadMore}
              disabled={loading}
            >
              {loading ? (
                <span className="oc-graph-controls__spinner" />
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Load more
                </>
              )}
            </button>
          </div>
        )}
      </div>
    );
  }
);

GraphControls.displayName = 'GraphControls';
