export const splitPaneStyles = `
/* SplitPane Component */
.oc-split-pane {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.oc-split-pane--horizontal {
  flex-direction: row;
}

.oc-split-pane--vertical {
  flex-direction: column;
}

.oc-split-pane--dragging {
  user-select: none;
}

/* Panes */
.oc-split-pane__pane {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.oc-split-pane__pane--first {
  flex-shrink: 0;
}

.oc-split-pane__pane--second {
  flex: 1;
  min-width: 0;
  min-height: 0;
}

/* Handle */
.oc-split-pane__handle {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  transition: background 0.15s ease;
}

.oc-split-pane--horizontal > .oc-split-pane__handle {
  width: 8px;
  cursor: col-resize;
}

.oc-split-pane--vertical > .oc-split-pane__handle {
  height: 8px;
  cursor: row-resize;
}

.oc-split-pane__handle:hover {
  background: var(--oc-bg-surface-hover, #F0F0F0);
}

.oc-split-pane__handle-bar {
  background: var(--oc-border-default, #E5E5E5);
  border-radius: 2px;
  transition: background 0.15s ease;
}

.oc-split-pane--horizontal .oc-split-pane__handle-bar {
  width: 2px;
  height: 32px;
}

.oc-split-pane--vertical .oc-split-pane__handle-bar {
  height: 2px;
  width: 32px;
}

.oc-split-pane__handle:hover .oc-split-pane__handle-bar,
.oc-split-pane--dragging .oc-split-pane__handle-bar {
  background: var(--oc-accent);
}

/* Generic Pane */
.oc-pane {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* Panel with header pattern */
.oc-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--oc-bg-canvas, #FFFFFF);
}

.oc-panel__header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--oc-spacing-sm, 8px) var(--oc-spacing-md, 16px);
  border-bottom: 1px solid var(--oc-border-default, #E5E5E5);
  min-height: 48px;
}

.oc-panel__title {
  font-size: var(--oc-font-size-sm, 14px);
  font-weight: 600;
  color: var(--oc-fg-primary, #1A1A1A);
}

.oc-panel__content {
  flex: 1;
  overflow: auto;
}
`;
