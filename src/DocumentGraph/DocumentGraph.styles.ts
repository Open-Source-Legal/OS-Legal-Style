export const documentGraphStyles = `
  /* ============================================
   * Document Graph Container
   * ============================================ */
  .oc-document-graph {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 400px;
    background-color: var(--oc-bg-canvas, #F8FAFC);
    border-radius: var(--oc-radius-lg, 12px);
    overflow: hidden;
  }

  .oc-document-graph__canvas {
    width: 100%;
    height: 100%;
    cursor: grab;
    user-select: none;
  }

  .oc-document-graph--dragging .oc-document-graph__canvas {
    cursor: grabbing;
  }

  .oc-document-graph__svg {
    display: block;
  }

  .oc-document-graph__content {
    transform-origin: 0 0;
  }

  /* Empty state */
  .oc-document-graph__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 12px;
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .oc-document-graph__empty svg {
    opacity: 0.5;
  }

  .oc-document-graph__empty p {
    margin: 0;
    font-family: var(--oc-font-family, 'Inter', system-ui, sans-serif);
    font-size: var(--oc-font-size-sm, 14px);
  }

  /* ============================================
   * Graph Node
   * ============================================ */
  .oc-graph-node {
    transition: opacity var(--oc-transition-fast, 0.15s) ease;
  }

  .oc-graph-node__ring {
    stroke: var(--oc-accent, #0F766E);
    stroke-width: 2;
    opacity: 0.3;
  }

  .oc-graph-node--selected .oc-graph-node__ring,
  .oc-graph-node--focus .oc-graph-node__ring {
    opacity: 0.5;
    stroke-width: 2.5;
  }

  .oc-graph-node__circle {
    fill: var(--oc-accent, #0F766E);
    stroke: var(--oc-bg-surface, #FFFFFF);
    stroke-width: 2;
    transition:
      fill var(--oc-transition-fast, 0.15s) ease,
      transform var(--oc-transition-fast, 0.15s) ease;
  }

  .oc-graph-node:hover .oc-graph-node__circle {
    fill: var(--oc-accent-hover, #0D9488);
  }

  .oc-graph-node--depth-1 .oc-graph-node__circle {
    fill: var(--oc-accent, #0F766E);
  }

  .oc-graph-node--depth-2 .oc-graph-node__circle {
    fill: var(--oc-accent, #0F766E);
    opacity: 0.7;
  }

  .oc-graph-node__initial {
    fill: var(--oc-bg-surface, #FFFFFF);
    font-family: var(--oc-font-family, 'Inter', system-ui, sans-serif);
    font-weight: 600;
  }

  .oc-graph-node__icon-wrapper {
    overflow: visible;
  }

  .oc-graph-node__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--oc-bg-surface, #FFFFFF);
  }

  .oc-graph-node__icon svg {
    width: 60%;
    height: 60%;
  }

  .oc-graph-node__title {
    fill: var(--oc-fg-primary, #1E293B);
    font-family: var(--oc-font-family, 'Inter', system-ui, sans-serif);
    font-weight: 500;
  }

  .oc-graph-node--focus .oc-graph-node__title {
    font-weight: 600;
  }

  .oc-graph-node__count {
    fill: var(--oc-fg-tertiary, #94A3B8);
    font-family: var(--oc-font-family, 'Inter', system-ui, sans-serif);
  }

  /* Expand badge */
  .oc-graph-node__expand-badge {
    fill: var(--oc-bg-surface, #FFFFFF);
    stroke: var(--oc-accent, #0F766E);
    stroke-width: 1.5;
  }

  .oc-graph-node__expand-icon {
    fill: var(--oc-accent, #0F766E);
    font-family: var(--oc-font-family, 'Inter', system-ui, sans-serif);
    font-weight: 600;
  }

  .oc-graph-node--expandable:hover .oc-graph-node__expand-badge {
    fill: var(--oc-accent, #0F766E);
  }

  .oc-graph-node--expandable:hover .oc-graph-node__expand-icon {
    fill: var(--oc-bg-surface, #FFFFFF);
  }

  /* ============================================
   * Graph Edge
   * ============================================ */
  .oc-graph-edge {
    pointer-events: visibleStroke;
  }

  .oc-graph-edge__line {
    fill: none;
    stroke: var(--oc-border-default, #CBD5E1);
    stroke-width: 1.5;
    stroke-linecap: round;
    transition:
      stroke var(--oc-transition-fast, 0.15s) ease,
      stroke-width var(--oc-transition-fast, 0.15s) ease,
      opacity var(--oc-transition-fast, 0.15s) ease;
  }

  .oc-graph-edge__arrow {
    fill: var(--oc-border-default, #CBD5E1);
    transition: fill var(--oc-transition-fast, 0.15s) ease;
  }

  .oc-graph-edge:hover .oc-graph-edge__line,
  .oc-graph-edge--selected .oc-graph-edge__line {
    stroke-width: 2;
  }

  .oc-graph-edge--muted .oc-graph-edge__line {
    opacity: 0.3;
  }

  .oc-graph-edge--muted .oc-graph-edge__arrow {
    opacity: 0.3;
  }

  /* Label */
  .oc-graph-edge__label-group {
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--oc-transition-fast, 0.15s) ease;
  }

  .oc-graph-edge:hover .oc-graph-edge__label-group,
  .oc-graph-edge--selected .oc-graph-edge__label-group {
    opacity: 1;
  }

  .oc-graph-edge__label-bg {
    fill: var(--oc-bg-surface, #FFFFFF);
    stroke: var(--oc-border-default, #E2E8F0);
    stroke-width: 1;
  }

  .oc-graph-edge__label {
    fill: var(--oc-fg-secondary, #475569);
    font-family: var(--oc-font-family, 'Inter', system-ui, sans-serif);
    font-size: 11px;
    font-weight: 500;
  }

  .oc-graph-edge__ai-badge-bg {
    fill: var(--oc-accent-light, rgba(15, 118, 110, 0.1));
  }

  .oc-graph-edge__ai-badge {
    fill: var(--oc-accent, #0F766E);
    font-family: var(--oc-font-family, 'Inter', system-ui, sans-serif);
    font-weight: 600;
  }

  /* ============================================
   * Graph Controls
   * ============================================ */
  .oc-graph-controls {
    position: absolute;
    bottom: 16px;
    left: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-width: calc(100% - 32px);
  }

  .oc-graph-controls__group {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 4px;
    background: var(--oc-bg-surface, #FFFFFF);
    border-radius: var(--oc-radius-md, 8px);
    box-shadow: var(--oc-shadow-md, 0 2px 8px rgba(0, 0, 0, 0.08));
  }

  .oc-graph-controls__button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 6px 8px;
    margin: 0;
    background: transparent;
    border: none;
    border-radius: var(--oc-radius-sm, 6px);
    font-family: var(--oc-font-family, 'Inter', system-ui, sans-serif);
    font-size: var(--oc-font-size-xs, 11px);
    font-weight: 500;
    color: var(--oc-fg-secondary, #475569);
    cursor: pointer;
    transition:
      background-color var(--oc-transition-fast, 0.15s) ease,
      color var(--oc-transition-fast, 0.15s) ease;
  }

  .oc-graph-controls__button:hover:not(:disabled) {
    background-color: var(--oc-bg-surface-hover, rgba(15, 118, 110, 0.06));
    color: var(--oc-fg-primary, #1E293B);
  }

  .oc-graph-controls__button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .oc-graph-controls__button--active {
    background-color: var(--oc-accent-light, rgba(15, 118, 110, 0.1));
    color: var(--oc-accent, #0F766E);
  }

  .oc-graph-controls__button--text {
    min-width: 44px;
    font-variant-numeric: tabular-nums;
  }

  .oc-graph-controls__load-more {
    padding: 6px 12px;
  }

  /* Filters */
  .oc-graph-controls__filters {
    gap: 4px;
  }

  .oc-graph-controls__filter {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px 4px 8px;
    margin: 0;
    background: transparent;
    border: none;
    border-radius: var(--oc-radius-sm, 6px);
    font-family: var(--oc-font-family, 'Inter', system-ui, sans-serif);
    font-size: var(--oc-font-size-xs, 11px);
    font-weight: 500;
    color: var(--oc-fg-tertiary, #94A3B8);
    cursor: pointer;
    transition:
      background-color var(--oc-transition-fast, 0.15s) ease,
      color var(--oc-transition-fast, 0.15s) ease;
  }

  .oc-graph-controls__filter:hover {
    background-color: var(--oc-bg-surface-hover, rgba(15, 118, 110, 0.06));
  }

  .oc-graph-controls__filter--active {
    color: var(--oc-fg-primary, #1E293B);
  }

  .oc-graph-controls__filter-dot {
    width: 8px;
    height: 8px;
    border-radius: var(--oc-radius-full, 9999px);
    flex-shrink: 0;
  }

  .oc-graph-controls__filter:not(.oc-graph-controls__filter--active) .oc-graph-controls__filter-dot {
    opacity: 0.4;
  }

  /* Spinner */
  .oc-graph-controls__spinner {
    width: 14px;
    height: 14px;
    border: 2px solid var(--oc-border-default, #E2E8F0);
    border-top-color: var(--oc-accent, #0F766E);
    border-radius: 50%;
    animation: oc-spin var(--oc-animation-spin, 0.8s) linear infinite;
  }
`;
