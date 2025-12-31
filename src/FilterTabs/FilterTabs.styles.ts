export const filterTabsStyles = `
/* ============================================
   FilterTabs Component
   ============================================ */

.oc-filter-tabs {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.oc-filter-tabs--underline {
  gap: 0;
  border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
}

/* FilterTab */
.oc-filter-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: transparent;
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-full, 9999px);
  font-family: inherit;
  font-size: var(--oc-font-size-sm, 14px);
  font-weight: 500;
  color: var(--oc-fg-secondary, #64748B);
  cursor: pointer;
  transition: all var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
  white-space: nowrap;
}

.oc-filter-tab:hover:not(:disabled) {
  border-color: var(--oc-border-strong, #CBD5E1);
  color: var(--oc-fg-primary, #475569);
}

.oc-filter-tab--active {
  background: #1E293B;
  border-color: #1E293B;
  color: var(--oc-fg-inverse, #FFFFFF);
}

.oc-filter-tab--active:hover:not(:disabled) {
  background: #334155;
  border-color: #334155;
  color: var(--oc-fg-inverse, #FFFFFF);
}

.oc-filter-tab--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Size variants */
.oc-filter-tab--sm {
  padding: 6px 12px;
  font-size: var(--oc-font-size-xs, 12px);
  gap: 4px;
}

.oc-filter-tab--lg {
  padding: 10px 18px;
  font-size: var(--oc-font-size-md, 15px);
  gap: 8px;
}

/* Underline variant */
.oc-filter-tab--underline {
  border: none;
  border-radius: 0;
  border-bottom: 2px solid transparent;
  padding: 12px 16px;
  margin-bottom: -1px;
}

.oc-filter-tab--underline:hover:not(:disabled) {
  background: var(--oc-bg-surface-hover, #F8FAFC);
  border-bottom-color: var(--oc-border-strong, #CBD5E1);
}

.oc-filter-tab--underline.oc-filter-tab--active {
  background: transparent;
  color: var(--oc-accent, #0F766E);
  border-bottom-color: var(--oc-accent, #0F766E);
}

.oc-filter-tab--underline.oc-filter-tab--active:hover:not(:disabled) {
  background: var(--oc-bg-surface-hover, #F8FAFC);
}

/* Icon */
.oc-filter-tab__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.oc-filter-tab__icon svg {
  width: 16px;
  height: 16px;
}

.oc-filter-tab--sm .oc-filter-tab__icon svg {
  width: 14px;
  height: 14px;
}

.oc-filter-tab--lg .oc-filter-tab__icon svg {
  width: 18px;
  height: 18px;
}

/* Label */
.oc-filter-tab__label {
  flex-shrink: 0;
}

/* Count badge */
.oc-filter-tab__count {
  font-size: 0.85em;
  opacity: 0.7;
}

.oc-filter-tab--active .oc-filter-tab__count {
  opacity: 0.8;
}
`;
