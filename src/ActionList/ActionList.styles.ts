export const actionListStyles = `
/* ============================================
   ActionList Component
   ============================================ */

.oc-action-list {
  display: flex;
  flex-direction: column;
}

.oc-action-list--card {
  background: var(--oc-bg-surface, #FFFFFF);
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-lg, 12px);
  padding: 8px;
}

/* ActionItem */
.oc-action-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: transparent;
  border: none;
  border-radius: var(--oc-radius-md, 8px);
  font-family: inherit;
  font-size: var(--oc-font-size-md, 15px);
  color: var(--oc-accent, #0F766E);
  cursor: pointer;
  transition: background-color var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
  text-align: left;
  text-decoration: none;
  width: 100%;
}

.oc-action-item:hover:not(:disabled) {
  background: rgba(15, 118, 110, 0.05);
}

.oc-action-item:focus-visible {
  outline: 2px solid var(--oc-accent, #0F766E);
  outline-offset: -2px;
}

.oc-action-item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Size variants */
.oc-action-item--sm {
  padding: 10px 12px;
  gap: 10px;
  font-size: var(--oc-font-size-sm, 14px);
}

.oc-action-item--lg {
  padding: 16px 20px;
  gap: 14px;
  font-size: var(--oc-font-size-lg, 16px);
}

/* Icon */
.oc-action-item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--oc-fg-tertiary, #94A3B8);
  flex-shrink: 0;
}

.oc-action-item__icon svg {
  width: 18px;
  height: 18px;
}

.oc-action-item--sm .oc-action-item__icon svg {
  width: 16px;
  height: 16px;
}

.oc-action-item--lg .oc-action-item__icon svg {
  width: 20px;
  height: 20px;
}

/* Content */
.oc-action-item__content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

/* Label */
.oc-action-item__label {
  font-weight: 500;
}

/* Description */
.oc-action-item__description {
  font-size: 0.85em;
  color: var(--oc-fg-tertiary, #94A3B8);
  font-weight: 400;
}

/* Card variant items */
.oc-action-list--card .oc-action-item {
  padding: 12px 14px;
}

.oc-action-list--card .oc-action-item:hover:not(:disabled) {
  background: var(--oc-bg-surface-hover, #F8FAFC);
}
`;
