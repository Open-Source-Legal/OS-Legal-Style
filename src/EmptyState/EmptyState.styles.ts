export const emptyStateStyles = `
/* Empty state */
.oc-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--oc-spacing-xl);
}

/* Sizes */
.oc-empty-state--sm {
  padding: var(--oc-spacing-md);
}

.oc-empty-state--sm .oc-empty-state__icon {
  margin-bottom: var(--oc-spacing-sm);
}

.oc-empty-state--sm .oc-empty-state__icon svg {
  width: 32px;
  height: 32px;
}

.oc-empty-state--sm .oc-empty-state__title {
  font-size: var(--oc-font-size-sm);
}

.oc-empty-state--sm .oc-empty-state__description {
  font-size: var(--oc-font-size-xs);
}

.oc-empty-state--md {
  padding: var(--oc-spacing-xl);
}

.oc-empty-state--lg {
  padding: var(--oc-spacing-2xl);
}

.oc-empty-state--lg .oc-empty-state__icon svg {
  width: 64px;
  height: 64px;
}

.oc-empty-state--lg .oc-empty-state__title {
  font-size: var(--oc-font-size-xl);
}

/* Icon */
.oc-empty-state__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--oc-spacing-md);
  color: var(--oc-fg-tertiary);
}

.oc-empty-state__icon svg {
  width: 48px;
  height: 48px;
}

/* Title */
.oc-empty-state__title {
  margin: 0 0 var(--oc-spacing-xs);
  font-size: var(--oc-font-size-md);
  font-weight: 600;
  color: var(--oc-fg-primary);
}

/* Description */
.oc-empty-state__description {
  margin: 0 0 var(--oc-spacing-md);
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-secondary);
  max-width: 320px;
}

/* Actions */
.oc-empty-state__actions {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-sm);
  flex-wrap: wrap;
  justify-content: center;
}
`;
