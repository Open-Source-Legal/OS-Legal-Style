export const extractCardStyles = `
/* ============================================
   ExtractCard Component
   ============================================ */

.oc-extract-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: var(--oc-bg-surface, #FFFFFF);
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-lg, 12px);
  transition: border-color var(--oc-duration-fast, 0.15s) var(--oc-easing-default),
              box-shadow var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
}

.oc-extract-card:hover {
  border-color: var(--oc-border-strong, #CBD5E1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.oc-extract-card--clickable {
  cursor: pointer;
}

.oc-extract-card--clickable:focus-visible {
  outline: 2px solid var(--oc-accent, #E85A4F);
  outline-offset: 2px;
}

/* Icon */
.oc-extract-card__icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--oc-bg-surface-hover, #F1F5F9);
  color: var(--oc-fg-secondary, #64748B);
}

.oc-extract-card__icon svg {
  width: 20px;
  height: 20px;
}

/* Content */
.oc-extract-card__content {
  flex: 1;
  min-width: 0;
}

/* Header */
.oc-extract-card__header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

/* Status badge */
.oc-extract-card__status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.oc-extract-card__status svg {
  width: 14px;
  height: 14px;
}

.oc-extract-card__status--pending {
  background: #F1F5F9;
  color: #64748B;
}

.oc-extract-card__status--queued {
  background: #FEF3C7;
  color: #92400E;
}

.oc-extract-card__status--running {
  background: #DBEAFE;
  color: #1E40AF;
}

.oc-extract-card__status--completed {
  background: #D1FAE5;
  color: #065F46;
}

.oc-extract-card__status--failed {
  background: #FEE2E2;
  color: #991B1B;
}

.oc-extract-card__progress-text {
  font-weight: 500;
  opacity: 0.8;
}

/* Spinning animation for running status */
@keyframes oc-extract-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.oc-extract-card__status-icon--spinning {
  animation: oc-extract-spin 1s linear infinite;
}

/* Corpus badge */
.oc-extract-card__corpus {
  font-size: var(--oc-font-size-sm, 13px);
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-extract-card__corpus::before {
  content: 'from ';
  opacity: 0.7;
}

/* Name */
.oc-extract-card__name {
  font-size: 16px;
  font-weight: 600;
  color: var(--oc-fg-primary, #1E293B);
  margin: 0 0 4px;
  line-height: 1.4;
}

/* Description */
.oc-extract-card__description {
  font-size: var(--oc-font-size-sm, 14px);
  line-height: 1.5;
  color: var(--oc-fg-secondary, #64748B);
  margin: 0 0 12px;
}

/* Progress bar */
.oc-extract-card__progress-bar {
  height: 4px;
  background: var(--oc-bg-surface-hover, #E2E8F0);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 12px;
}

.oc-extract-card__progress-fill {
  height: 100%;
  background: var(--oc-accent, #E85A4F);
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* Footer */
.oc-extract-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

/* Stats */
.oc-extract-card__stats {
  font-size: var(--oc-font-size-sm, 13px);
  color: var(--oc-fg-secondary, #64748B);
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.oc-extract-card__stats span {
  display: inline-flex;
  align-items: center;
}

.oc-extract-card__stats span:not(:last-child)::after {
  content: '\\00B7';
  margin-left: 6px;
  opacity: 0.5;
}

/* Time */
.oc-extract-card__time {
  font-size: var(--oc-font-size-sm, 13px);
  color: var(--oc-fg-tertiary, #94A3B8);
}

/* Menu */
.oc-extract-card__menu {
  display: flex;
  flex-shrink: 0;
  align-self: flex-start;
  margin-left: 8px;
}

.oc-extract-card__menu-button {
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

.oc-extract-card__menu-button:hover {
  background: var(--oc-bg-surface-hover, #F1F5F9);
  border-color: var(--oc-border-default, #E2E8F0);
  color: var(--oc-fg-secondary, #64748B);
}

.oc-extract-card__menu-button:focus-visible {
  outline: 2px solid var(--oc-accent, #E85A4F);
  outline-offset: 2px;
}

/* ============================================
   ExtractList Component
   ============================================ */

.oc-extract-list {
  display: flex;
  flex-direction: column;
}

.oc-extract-list--gap-sm {
  gap: 12px;
}

.oc-extract-list--gap-md {
  gap: 16px;
}

.oc-extract-list--gap-lg {
  gap: 24px;
}

/* Grid layout */
.oc-extract-list--grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
}

/* Responsive */
@media (max-width: 640px) {
  .oc-extract-card {
    padding: 16px;
    gap: 12px;
  }

  .oc-extract-card__icon {
    width: 36px;
    height: 36px;
  }

  .oc-extract-card__icon svg {
    width: 18px;
    height: 18px;
  }

  .oc-extract-card__name {
    font-size: 15px;
  }

  .oc-extract-card__description {
    font-size: 13px;
  }

  .oc-extract-card__footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .oc-extract-list--grid {
    grid-template-columns: 1fr;
  }
}
`;
