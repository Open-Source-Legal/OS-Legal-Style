export const collectionCardStyles = `
/* ============================================
   CollectionCard Component
   ============================================ */

.oc-collection-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: var(--oc-bg-surface, #FFFFFF);
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-lg, 12px);
  transition: border-color var(--oc-duration-fast, 0.15s) var(--oc-easing-default),
              box-shadow var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
}

.oc-collection-card:hover {
  border-color: var(--oc-border-strong, #CBD5E1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.oc-collection-card--clickable {
  cursor: pointer;
}

.oc-collection-card--clickable:focus-visible {
  outline: 2px solid var(--oc-accent, #0F766E);
  outline-offset: 2px;
}

/* Icon */
.oc-collection-card__icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--oc-bg-surface-hover, #F8FAFC);
  border-radius: var(--oc-radius-md, 10px);
  color: var(--oc-fg-secondary, #64748B);
  flex-shrink: 0;
}

.oc-collection-card__icon svg {
  width: 20px;
  height: 20px;
}

/* Content */
.oc-collection-card__content {
  flex: 1;
  min-width: 0;
}

/* Header */
.oc-collection-card__header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

/* Badge */
.oc-collection-card__badge {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

/* Status */
.oc-collection-card__status {
  font-size: var(--oc-font-size-sm, 13px);
  color: var(--oc-fg-tertiary, #94A3B8);
}

/* Title */
.oc-collection-card__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--oc-fg-primary, #1E293B);
  margin: 0 0 6px;
  line-height: 1.4;
}

/* Description */
.oc-collection-card__description {
  font-size: var(--oc-font-size-sm, 14px);
  line-height: 1.5;
  color: var(--oc-fg-secondary, #64748B);
  margin: 0 0 12px;
}

/* Stats */
.oc-collection-card__stats {
  font-size: var(--oc-font-size-sm, 13px);
  color: var(--oc-fg-tertiary, #94A3B8);
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.oc-collection-card__stats span {
  display: inline-flex;
  align-items: center;
}

.oc-collection-card__stats span:not(:last-child)::after {
  content: '•';
  margin-left: 6px;
  opacity: 0.5;
}

/* ============================================
   CollectionList Component
   ============================================ */

.oc-collection-list {
  display: flex;
  flex-direction: column;
}

.oc-collection-list--gap-sm {
  gap: 12px;
}

.oc-collection-list--gap-md {
  gap: 16px;
}

.oc-collection-list--gap-lg {
  gap: 24px;
}

/* Responsive */
@media (max-width: 640px) {
  .oc-collection-card {
    padding: 16px;
    gap: 12px;
  }

  .oc-collection-card__icon {
    width: 40px;
    height: 40px;
  }

  .oc-collection-card__title {
    font-size: 15px;
  }

  .oc-collection-card__description {
    font-size: 13px;
  }
}
`;
