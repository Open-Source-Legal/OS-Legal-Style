export const tabsStyles = `
/* Tabs container */
.oc-tabs {
  display: flex;
  flex-direction: column;
}

.oc-tabs--vertical {
  flex-direction: row;
}

/* Tab list */
.oc-tab-list {
  display: flex;
  gap: var(--oc-spacing-xs);
}

.oc-tabs--horizontal .oc-tab-list {
  flex-direction: row;
}

.oc-tabs--vertical .oc-tab-list {
  flex-direction: column;
  border-right: 1px solid var(--oc-border-default);
  padding-right: var(--oc-spacing-sm);
  margin-right: var(--oc-spacing-md);
}

/* Line variant */
.oc-tabs--line .oc-tab-list {
  border-bottom: 1px solid var(--oc-border-default);
  gap: 0;
}

.oc-tabs--line.oc-tabs--vertical .oc-tab-list {
  border-bottom: none;
  border-right: 1px solid var(--oc-border-default);
}

/* Tab button */
.oc-tab {
  display: inline-flex;
  align-items: center;
  gap: var(--oc-spacing-xs);
  padding: var(--oc-spacing-sm) var(--oc-spacing-md);
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: var(--oc-font-size-sm);
  font-weight: 500;
  color: var(--oc-fg-secondary);
  cursor: pointer;
  transition: all var(--oc-duration-fast) var(--oc-easing-default);
  white-space: nowrap;
}

.oc-tab:hover:not(.oc-tab--disabled) {
  color: var(--oc-fg-primary);
}

.oc-tab--selected {
  color: var(--oc-fg-primary);
}

.oc-tab--disabled {
  opacity: var(--oc-opacity-disabled);
  cursor: not-allowed;
}

.oc-tab:focus-visible {
  outline: 2px solid var(--oc-accent);
  outline-offset: -2px;
  border-radius: var(--oc-radius-sm);
}

.oc-tab__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.oc-tab__icon svg {
  width: 16px;
  height: 16px;
}

/* Line variant tab */
.oc-tabs--line .oc-tab {
  position: relative;
  border-radius: 0;
  margin-bottom: -1px;
}

.oc-tabs--line .oc-tab::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: transparent;
  transition: background-color var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-tabs--line .oc-tab--selected::after {
  background: var(--oc-accent);
}

.oc-tabs--line.oc-tabs--vertical .oc-tab {
  margin-bottom: 0;
  margin-right: -1px;
}

.oc-tabs--line.oc-tabs--vertical .oc-tab::after {
  bottom: auto;
  left: auto;
  top: 0;
  right: 0;
  width: 2px;
  height: 100%;
}

/* Enclosed variant */
.oc-tabs--enclosed .oc-tab-list {
  background: var(--oc-bg-surface);
  border-radius: var(--oc-radius-md);
  padding: var(--oc-spacing-xs);
}

.oc-tabs--enclosed .oc-tab {
  border-radius: var(--oc-radius-sm);
}

.oc-tabs--enclosed .oc-tab--selected {
  background: var(--oc-bg-canvas);
  box-shadow: var(--oc-shadow-sm);
}

/* Pills variant */
.oc-tabs--pills .oc-tab {
  border-radius: var(--oc-radius-full);
}

.oc-tabs--pills .oc-tab--selected {
  background: var(--oc-accent);
  color: var(--oc-fg-inverse);
}

.oc-tabs--pills .oc-tab:hover:not(.oc-tab--disabled):not(.oc-tab--selected) {
  background: var(--oc-bg-surface);
}

/* Tab panels */
.oc-tab-panels {
  flex: 1;
}

.oc-tab-panel {
  padding: var(--oc-spacing-md) 0;
}

.oc-tabs--vertical .oc-tab-panel {
  padding: 0;
}

.oc-tab-panel:focus {
  outline: none;
}
`;
