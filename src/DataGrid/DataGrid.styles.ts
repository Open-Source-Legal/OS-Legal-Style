export const dataGridStyles = `
/* ============================================
   DataGrid Component
   ============================================ */

.oc-data-grid {
  position: relative;
  background: var(--oc-bg-surface, #FFFFFF);
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-lg, 12px);
  overflow: auto;
}

.oc-data-grid__table {
  width: 100%;
  min-width: max-content;
  border-collapse: collapse;
  font-size: 14px;
}

/* Header */
.oc-data-grid__header {
  background: var(--oc-bg-surface-hover, #F8FAFC);
  border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
}

.oc-data-grid--sticky-header .oc-data-grid__header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.oc-data-grid__th {
  padding: 14px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: var(--oc-fg-secondary, #64748B);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  user-select: none;
}

.oc-data-grid__th--sortable {
  cursor: pointer;
  transition: color var(--oc-duration-fast, 0.15s);
}

.oc-data-grid__th--sortable:hover {
  color: var(--oc-fg-primary, #1E293B);
}

.oc-data-grid__th--checkbox,
.oc-data-grid__th--actions {
  width: 48px;
  padding: 14px 12px;
}

.oc-data-grid__th--center {
  text-align: center;
}

.oc-data-grid__th--right {
  text-align: right;
}

.oc-data-grid__th-content {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.oc-data-grid__sort-icon {
  opacity: 0.5;
  transition: opacity var(--oc-duration-fast, 0.15s);
}

.oc-data-grid__th--sortable:hover .oc-data-grid__sort-icon {
  opacity: 1;
}

/* Body */
.oc-data-grid__body {
  /* Body styles */
}

.oc-data-grid__row {
  border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  transition: background-color var(--oc-duration-fast, 0.15s);
}

.oc-data-grid__row:last-child {
  border-bottom: none;
}

.oc-data-grid__row:hover {
  background: var(--oc-bg-surface-hover, #F8FAFC);
}

.oc-data-grid__row--clickable {
  cursor: pointer;
}

.oc-data-grid__row--selected {
  background: rgba(232, 90, 79, 0.06);
}

.oc-data-grid__row--selected:hover {
  background: rgba(232, 90, 79, 0.1);
}

/* Striped */
.oc-data-grid--striped .oc-data-grid__row:nth-child(even) {
  background: var(--oc-bg-surface-hover, #F8FAFC);
}

.oc-data-grid--striped .oc-data-grid__row:nth-child(even):hover {
  background: #F1F5F9;
}

/* Cells */
.oc-data-grid__cell {
  padding: 14px 16px;
  color: var(--oc-fg-primary, #1E293B);
  vertical-align: middle;
}

.oc-data-grid__cell--checkbox,
.oc-data-grid__cell--actions {
  width: 48px;
  padding: 14px 12px;
}

.oc-data-grid__cell--center {
  text-align: center;
}

.oc-data-grid__cell--right {
  text-align: right;
}

.oc-data-grid__cell--number {
  font-variant-numeric: tabular-nums;
}

.oc-data-grid__cell-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Compact mode */
.oc-data-grid--compact .oc-data-grid__th {
  padding: 10px 12px;
}

.oc-data-grid--compact .oc-data-grid__cell {
  padding: 10px 12px;
}

/* Checkbox styling */
.oc-data-grid__checkbox-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.oc-data-grid__checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.oc-data-grid__checkbox-custom {
  width: 18px;
  height: 18px;
  border: 2px solid var(--oc-border-strong, #CBD5E1);
  border-radius: 4px;
  background: var(--oc-bg-surface, #FFFFFF);
  transition: all var(--oc-duration-fast, 0.15s);
  display: flex;
  align-items: center;
  justify-content: center;
}

.oc-data-grid__checkbox-custom::after {
  content: '';
  width: 10px;
  height: 10px;
  background: var(--oc-accent, #E85A4F);
  border-radius: 2px;
  transform: scale(0);
  transition: transform var(--oc-duration-fast, 0.15s);
}

.oc-data-grid__checkbox:checked + .oc-data-grid__checkbox-custom {
  border-color: var(--oc-accent, #E85A4F);
}

.oc-data-grid__checkbox:checked + .oc-data-grid__checkbox-custom::after {
  transform: scale(1);
}

.oc-data-grid__checkbox:indeterminate + .oc-data-grid__checkbox-custom {
  border-color: var(--oc-accent, #E85A4F);
}

.oc-data-grid__checkbox:indeterminate + .oc-data-grid__checkbox-custom::after {
  transform: scale(1);
  height: 3px;
  border-radius: 1px;
}

.oc-data-grid__checkbox:focus-visible + .oc-data-grid__checkbox-custom {
  outline: 2px solid var(--oc-accent, #E85A4F);
  outline-offset: 2px;
}

/* Boolean check */
.oc-data-grid__boolean-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #D1FAE5;
  color: #065F46;
}

/* Links */
.oc-data-grid__link {
  color: var(--oc-accent, #E85A4F);
  text-decoration: none;
  transition: opacity var(--oc-duration-fast, 0.15s);
}

.oc-data-grid__link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

/* Cell actions */
.oc-data-grid__cell-action-wrapper {
  position: relative;
  margin-left: auto;
}

.oc-data-grid__cell-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--oc-radius-sm, 6px);
  color: var(--oc-fg-tertiary, #94A3B8);
  cursor: pointer;
  opacity: 0;
  transition: all var(--oc-duration-fast, 0.15s);
}

.oc-data-grid__row:hover .oc-data-grid__cell-action-btn,
.oc-data-grid__cell-action-btn[aria-expanded="true"] {
  opacity: 1;
}

.oc-data-grid__cell-action-btn:hover {
  background: var(--oc-bg-surface-hover, #F1F5F9);
  color: var(--oc-fg-secondary, #64748B);
}

/* Cell menu */
.oc-data-grid__cell-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 20;
  min-width: 160px;
  margin-top: 4px;
  padding: 6px 0;
  background: var(--oc-bg-surface, #FFFFFF);
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-md, 8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.oc-data-grid__cell-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 14px;
  background: transparent;
  border: none;
  font-size: 14px;
  color: var(--oc-fg-primary, #334155);
  text-align: left;
  cursor: pointer;
  transition: background var(--oc-duration-fast, 0.15s);
}

.oc-data-grid__cell-menu-item:hover {
  background: var(--oc-bg-surface-hover, #F1F5F9);
}

.oc-data-grid__cell-menu-item--danger {
  color: #DC2626;
}

.oc-data-grid__cell-menu-item--danger:hover {
  background: #FEF2F2;
}

.oc-data-grid__cell-menu-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
}

/* Empty state */
.oc-data-grid__empty {
  padding: 48px 24px;
  text-align: center;
}

.oc-data-grid__empty-default {
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-data-grid__empty-default p {
  margin: 0;
  font-size: 15px;
}

/* Loading skeleton */
.oc-data-grid__row--skeleton {
  pointer-events: none;
}

.oc-data-grid__skeleton {
  height: 16px;
  background: linear-gradient(
    90deg,
    var(--oc-bg-surface-hover, #F1F5F9) 0%,
    #E2E8F0 50%,
    var(--oc-bg-surface-hover, #F1F5F9) 100%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: oc-data-grid-shimmer 1.5s ease-in-out infinite;
}

@keyframes oc-data-grid-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Responsive */
@media (max-width: 768px) {
  .oc-data-grid {
    border-radius: var(--oc-radius-md, 8px);
  }

  .oc-data-grid__th {
    padding: 12px;
    font-size: 11px;
  }

  .oc-data-grid__cell {
    padding: 12px;
    font-size: 13px;
  }

  .oc-data-grid__cell-action-btn {
    opacity: 1;
  }
}
`;
