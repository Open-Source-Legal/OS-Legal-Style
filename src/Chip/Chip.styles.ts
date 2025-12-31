export const chipStyles = `
/* Chip Component */
.oc-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  border-radius: var(--oc-radius-full, 9999px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  user-select: none;
}

.oc-chip--static {
  cursor: default;
}

/* Sizes */
.oc-chip--sm {
  height: 24px;
  padding: 0 10px;
  font-size: 12px;
}

.oc-chip--md {
  height: 32px;
  padding: 0 14px;
  font-size: 13px;
}

.oc-chip--lg {
  height: 40px;
  padding: 0 18px;
  font-size: 14px;
}

/* Icons */
.oc-chip__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.oc-chip--sm .oc-chip__icon { margin-left: -2px; }
.oc-chip--md .oc-chip__icon { margin-left: -4px; }
.oc-chip--lg .oc-chip__icon { margin-left: -4px; }

.oc-chip__icon--end {
  margin-left: 0 !important;
}

.oc-chip--sm .oc-chip__icon--end { margin-right: -2px; }
.oc-chip--md .oc-chip__icon--end { margin-right: -4px; }
.oc-chip--lg .oc-chip__icon--end { margin-right: -4px; }

/* Label */
.oc-chip__label {
  display: flex;
  align-items: center;
}

/* Remove button */
.oc-chip__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: 2px;
  border: none;
  background: transparent;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
  border-radius: 50%;
  transition: opacity 0.15s ease, background 0.15s ease;
}

.oc-chip--sm .oc-chip__remove { margin-right: -4px; width: 16px; height: 16px; }
.oc-chip--md .oc-chip__remove { margin-right: -6px; width: 20px; height: 20px; }
.oc-chip--lg .oc-chip__remove { margin-right: -6px; width: 24px; height: 24px; }

.oc-chip__remove:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.1);
}

/* ========== VARIANTS ========== */

/* Filled */
.oc-chip--filled.oc-chip--default {
  background: var(--oc-fg-primary, #1A1A1A);
  color: white;
}

.oc-chip--filled.oc-chip--accent {
  background: var(--oc-accent);
  color: white;
  box-shadow: 0 2px 8px rgba(8, 145, 178, 0.25);
}

.oc-chip--filled.oc-chip--success {
  background: linear-gradient(135deg, var(--oc-success, #10B981) 0%, #059669 100%);
  color: white;
}

.oc-chip--filled.oc-chip--warning {
  background: linear-gradient(135deg, var(--oc-warning, #F59E0B) 0%, #D97706 100%);
  color: white;
}

.oc-chip--filled.oc-chip--error {
  background: linear-gradient(135deg, var(--oc-error, #EF4444) 0%, #DC2626 100%);
  color: white;
}

.oc-chip--filled.oc-chip--info {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  color: white;
}

/* Soft */
.oc-chip--soft.oc-chip--default {
  background: var(--oc-bg-surface, #F8F8F8);
  color: var(--oc-fg-primary, #1A1A1A);
}

.oc-chip--soft.oc-chip--accent {
  background: rgba(8, 145, 178, 0.1);
  color: var(--oc-accent);
}

.oc-chip--soft.oc-chip--success {
  background: var(--oc-success-bg, #ECFDF5);
  color: #059669;
}

.oc-chip--soft.oc-chip--warning {
  background: var(--oc-warning-bg, #FFFBEB);
  color: #B45309;
}

.oc-chip--soft.oc-chip--error {
  background: var(--oc-error-bg, #FEF2F2);
  color: #DC2626;
}

.oc-chip--soft.oc-chip--info {
  background: #EFF6FF;
  color: #2563EB;
}

/* Outlined */
.oc-chip--outlined {
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--oc-border-default, #E5E5E5);
}

.oc-chip--outlined.oc-chip--default {
  color: var(--oc-fg-secondary, #6B6B6B);
}

.oc-chip--outlined.oc-chip--accent {
  box-shadow: inset 0 0 0 1px var(--oc-accent);
  color: var(--oc-accent);
}

.oc-chip--outlined.oc-chip--success {
  box-shadow: inset 0 0 0 1px var(--oc-success, #10B981);
  color: #059669;
}

.oc-chip--outlined.oc-chip--warning {
  box-shadow: inset 0 0 0 1px var(--oc-warning, #F59E0B);
  color: #B45309;
}

.oc-chip--outlined.oc-chip--error {
  box-shadow: inset 0 0 0 1px var(--oc-error, #EF4444);
  color: #DC2626;
}

.oc-chip--outlined.oc-chip--info {
  box-shadow: inset 0 0 0 1px #3B82F6;
  color: #2563EB;
}

/* Hover states */
.oc-chip:not(.oc-chip--static):hover {
  transform: translateY(-1px);
}

.oc-chip--soft:not(.oc-chip--static):hover {
  filter: brightness(0.95);
}

.oc-chip--outlined:not(.oc-chip--static):hover {
  background: var(--oc-bg-surface, #F8F8F8);
}

.oc-chip--filled:not(.oc-chip--static):hover {
  filter: brightness(1.05);
}

/* Selected state */
.oc-chip--selected {
  box-shadow: 0 0 0 2px rgba(8, 145, 178, 0.2);
}

/* Active state */
.oc-chip:not(.oc-chip--static):active {
  transform: translateY(0);
}

/* Chip Group */
.oc-chip-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.oc-chip-group--gap-sm {
  gap: 6px;
}

.oc-chip-group--gap-md {
  gap: 10px;
}
`;
