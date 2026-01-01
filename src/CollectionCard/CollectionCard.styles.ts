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

/* Avatar - uniform circular treatment for icons and images */
.oc-collection-card__icon,
.oc-collection-card__image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.oc-collection-card__icon {
  background: var(--oc-bg-surface-hover, #F1F5F9);
  color: var(--oc-fg-secondary, #64748B);
}

.oc-collection-card__icon svg {
  width: 20px;
  height: 20px;
}

.oc-collection-card__image {
  background: var(--oc-bg-surface-hover, #F1F5F9);
}

.oc-collection-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

/* Menu */
.oc-collection-card__menu {
  display: flex;
  flex-shrink: 0;
  align-self: flex-start;
  margin-left: 8px;
}

.oc-collection-card__menu-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  padding: 0;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--oc-radius-sm, 6px);
  color: var(--oc-fg-tertiary, #94A3B8);
  cursor: pointer;
  transition: background-color var(--oc-duration-fast, 0.15s) var(--oc-easing-default),
              color var(--oc-duration-fast, 0.15s) var(--oc-easing-default),
              border-color var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
}

.oc-collection-card__menu-button:hover {
  background: var(--oc-bg-surface-hover, #F1F5F9);
  border-color: var(--oc-border-default, #E2E8F0);
  color: var(--oc-fg-secondary, #64748B);
}

.oc-collection-card__menu-button:focus-visible {
  outline: 2px solid var(--oc-accent, #0F766E);
  outline-offset: 2px;
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

  .oc-collection-card__icon,
  .oc-collection-card__image {
    width: 36px;
    height: 36px;
  }

  .oc-collection-card__icon svg {
    width: 18px;
    height: 18px;
  }

  .oc-collection-card__title {
    font-size: 15px;
  }

  .oc-collection-card__description {
    font-size: 13px;
  }
}
`;
