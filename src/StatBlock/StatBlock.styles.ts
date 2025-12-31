export const statBlockStyles = `
/* ============================================
   StatBlock Component
   ============================================ */

.oc-stat-block {
  display: flex;
  gap: 12px;
}

.oc-stat-block--center {
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.oc-stat-block--left {
  align-items: flex-start;
}

/* Icon */
.oc-stat-block__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--oc-bg-surface-hover, #F8FAFC);
  border-radius: var(--oc-radius-md, 8px);
  color: var(--oc-fg-secondary, #64748B);
  flex-shrink: 0;
}

.oc-stat-block__icon svg {
  width: 24px;
  height: 24px;
}

/* Content */
.oc-stat-block__content {
  min-width: 0;
}

/* Value */
.oc-stat-block__value {
  font-size: 36px;
  font-weight: 400;
  line-height: 1;
  margin-bottom: 4px;
  font-feature-settings: 'tnum' 1;
}

.oc-stat-block--default .oc-stat-block__value {
  color: var(--oc-fg-primary, #1E293B);
}

.oc-stat-block--accent .oc-stat-block__value {
  color: var(--oc-accent, #0F766E);
}

.oc-stat-block--muted .oc-stat-block__value {
  color: var(--oc-fg-secondary, #64748B);
}

/* Label */
.oc-stat-block__label {
  font-size: var(--oc-font-size-md, 15px);
  font-weight: 500;
  color: var(--oc-fg-primary, #1E293B);
  line-height: 1.4;
}

/* Sublabel */
.oc-stat-block__sublabel {
  font-size: var(--oc-font-size-sm, 13px);
  color: var(--oc-fg-tertiary, #94A3B8);
  line-height: 1.4;
}

/* Size variants */
.oc-stat-block--sm .oc-stat-block__value {
  font-size: 24px;
}

.oc-stat-block--sm .oc-stat-block__label {
  font-size: var(--oc-font-size-sm, 13px);
}

.oc-stat-block--sm .oc-stat-block__sublabel {
  font-size: var(--oc-font-size-xs, 11px);
}

.oc-stat-block--sm .oc-stat-block__icon {
  width: 36px;
  height: 36px;
}

.oc-stat-block--sm .oc-stat-block__icon svg {
  width: 18px;
  height: 18px;
}

.oc-stat-block--lg .oc-stat-block__value {
  font-size: 48px;
}

.oc-stat-block--lg .oc-stat-block__label {
  font-size: var(--oc-font-size-lg, 17px);
}

.oc-stat-block--lg .oc-stat-block__sublabel {
  font-size: var(--oc-font-size-md, 15px);
}

.oc-stat-block--lg .oc-stat-block__icon {
  width: 56px;
  height: 56px;
}

.oc-stat-block--lg .oc-stat-block__icon svg {
  width: 28px;
  height: 28px;
}

/* ============================================
   StatGrid Component
   ============================================ */

.oc-stat-grid {
  display: grid;
}

/* Columns */
.oc-stat-grid--cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.oc-stat-grid--cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

.oc-stat-grid--cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* Gap */
.oc-stat-grid--gap-sm {
  gap: 16px 24px;
}

.oc-stat-grid--gap-md {
  gap: 32px 48px;
}

.oc-stat-grid--gap-lg {
  gap: 48px 64px;
}

/* Responsive */
@media (max-width: 768px) {
  .oc-stat-grid--cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .oc-stat-grid--cols-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .oc-stat-grid--cols-4,
  .oc-stat-grid--cols-3,
  .oc-stat-grid--cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .oc-stat-grid--gap-md {
    gap: 24px 32px;
  }

  .oc-stat-grid--gap-lg {
    gap: 32px 40px;
  }

  .oc-stat-block__value {
    font-size: 28px;
  }
}
`;
