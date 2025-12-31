export const sourcesPanelStyles = `
/* ============ Sources Panel Container ============ */
.oc-sources-panel {
  display: flex;
  flex-direction: column;
  background: var(--oc-bg-canvas, #FFFFFF);
  border-radius: var(--oc-radius-lg, 8px);
  box-shadow: var(--oc-shadow-lg);
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ============ Panel Tabs ============ */
.oc-panel-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 12px 0;
  border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
}

.oc-panel-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid transparent;
  border-bottom: none;
  border-radius: var(--oc-radius-md, 6px) var(--oc-radius-md, 6px) 0 0;
  background: transparent;
  color: var(--oc-fg-secondary, #475569);
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-bottom: -1px;
}

.oc-panel-tab:hover {
  background: var(--oc-bg-surface, #F8FAFC);
  color: var(--oc-fg-primary, #0F172A);
}

.oc-panel-tab--selected {
  background: var(--oc-bg-canvas, #FFFFFF);
  border-color: var(--oc-border-default, #E2E8F0);
  border-bottom-color: var(--oc-bg-canvas, #FFFFFF);
  color: var(--oc-fg-primary, #0F172A);
}

.oc-panel-tab__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: currentColor;
}

.oc-panel-tab__icon svg {
  width: 100%;
  height: 100%;
}

.oc-panel-tab__label {
  white-space: nowrap;
}

/* ============ Panel Search ============ */
.oc-panel-search {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  margin: 12px;
  background: var(--oc-bg-surface, #F8FAFC);
  border-radius: var(--oc-radius-md, 6px);
  border: 1px solid transparent;
  transition: all 0.15s ease;
}

.oc-panel-search:focus-within {
  background: var(--oc-bg-canvas, #FFFFFF);
  border-color: var(--oc-accent, #0891B2);
  box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.15);
}

.oc-panel-search__icon {
  flex-shrink: 0;
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-panel-search__input {
  flex: 1;
  min-width: 0;
  padding: 0;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  color: var(--oc-fg-primary, #0F172A);
  outline: none;
}

.oc-panel-search__input::placeholder {
  color: var(--oc-fg-tertiary, #94A3B8);
}

/* ============ Panel Action List ============ */
.oc-panel-action-list {
  display: flex;
  flex-direction: column;
  padding: 0 8px 8px;
}

/* ============ Panel Action ============ */
.oc-panel-action {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  border: none;
  border-radius: var(--oc-radius-md, 6px);
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;
}

.oc-panel-action:hover {
  background: var(--oc-bg-surface, #F8FAFC);
}

.oc-panel-action:active {
  background: var(--oc-bg-surface-hover, #F1F5F9);
}

.oc-panel-action--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.oc-panel-action--disabled:hover {
  background: transparent;
}

.oc-panel-action__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--oc-radius-sm, 4px);
  color: var(--oc-fg-secondary, #475569);
}

.oc-panel-action__icon svg {
  width: 20px;
  height: 20px;
}

.oc-panel-action__icon img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.oc-panel-action__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.oc-panel-action__label {
  font-size: 14px;
  font-weight: 500;
  color: var(--oc-fg-primary, #0F172A);
}

.oc-panel-action__desc {
  font-size: 12px;
  color: var(--oc-fg-tertiary, #94A3B8);
}

/* ============ Panel Section ============ */
.oc-panel-section {
  padding: 0 12px 12px;
}

.oc-panel-section__title {
  margin: 0 0 8px;
  padding: 0 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-panel-section__content {
  display: flex;
  flex-direction: column;
}

/* ============ Integration Colors ============ */
.oc-panel-action--docvault .oc-panel-action__icon {
  color: #E85B5B;
}

.oc-panel-action--filenexus .oc-panel-action__icon {
  color: #1B4F72;
}

.oc-panel-action--clouddrive .oc-panel-action__icon {
  color: #038387;
}

.oc-panel-action--upload .oc-panel-action__icon {
  color: var(--oc-accent, #0891B2);
}
`;
